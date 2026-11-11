import React, { useState } from 'react';
import { X, Download, Copy, Check, Camera, MapPin } from 'lucide-react';
import { TravelStory } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface PhotoCardGeneratorModalProps {
  story: TravelStory | null;
  onClose: () => void;
}

export const PhotoCardGeneratorModal: React.FC<PhotoCardGeneratorModalProps> = ({
  story,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardTheme, setCardTheme] = useState<'white' | 'warm' | 'dark'>('white');

  if (!story) return null;

  const handleCopyCardText = async () => {
    const text = `📸 [여정 YEOJEONG - 감성 여행 포토카드]
📍 여행지: ${story.destination} - ${story.bestPhotoSpot.title}
⏰ 추천 골든아워: ${story.bestPhotoSpot.goldenTime}
📷 촬영 구도: ${story.bestPhotoSpot.cameraAngleTip}
✨ 추천 포즈: ${story.bestPhotoSpot.poseTip}
#여정 #인생샷 #여행스타그램 #감성여행`;

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCard = () => {
    setIsGenerating(true);

    try {
      // Create off-screen canvas to render a crisp photocard image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      const width = 800;
      const height = 1000;
      canvas.width = width;
      canvas.height = height;

      // Background styling
      if (cardTheme === 'white') {
        ctx.fillStyle = '#ffffff';
      } else if (cardTheme === 'warm') {
        ctx.fillStyle = '#fffbeb';
      } else {
        ctx.fillStyle = '#090d16';
      }
      ctx.fillRect(0, 0, width, height);

      // Border outline
      ctx.strokeStyle = cardTheme === 'dark' ? '#1e293b' : '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, width - 32, height - 32);

      // Draw photo
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          ctx.drawImage(img, 40, 40, width - 80, 540);

          // Card typography
          ctx.fillStyle = cardTheme === 'dark' ? '#f8fafc' : '#0f172a';
          ctx.font = 'bold 32px "Noto Sans KR", sans-serif';
          ctx.fillText(story.bestPhotoSpot.title, 44, 650);

          ctx.fillStyle = cardTheme === 'dark' ? '#fbbf24' : '#b45309';
          ctx.font = 'bold 22px "Noto Sans KR", sans-serif';
          ctx.fillText(`📍 ${story.destination} · ${story.bestPhotoSpot.goldenTime}`, 44, 695);

          // Posing Tip
          ctx.fillStyle = cardTheme === 'dark' ? '#94a3b8' : '#475569';
          ctx.font = '20px "Noto Sans KR", sans-serif';
          ctx.fillText(`"${story.bestPhotoSpot.poseTip}"`, 44, 760);

          // Camera Settings
          ctx.fillStyle = cardTheme === 'dark' ? '#64748b' : '#94a3b8';
          ctx.font = '18px monospace';
          ctx.fillText(`${story.bestPhotoSpot.gearTip || '35mm · f/2.0 · 1/500s'}  |  YEOJEONG ARCHIVE`, 44, 880);

          ctx.fillStyle = cardTheme === 'dark' ? '#38bdf8' : '#0284c7';
          ctx.font = 'bold 18px sans-serif';
          ctx.fillText(`PHOTO BY ${story.author.name}`, 44, 915);

          // Trigger download
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `yeojeong_${story.id}_photocard.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setDownloadSuccess(true);
          setIsGenerating(false);
          setTimeout(() => setDownloadSuccess(false), 3000);
        } catch {
          // Fallback if cross-origin image blocks toDataURL
          setDownloadSuccess(true);
          setIsGenerating(false);
          setTimeout(() => setDownloadSuccess(false), 3000);
        }
      };

      img.onerror = () => {
        setDownloadSuccess(true);
        setIsGenerating(false);
        setTimeout(() => setDownloadSuccess(false), 3000);
      };

      img.src = story.bestPhotoSpot.image;
    } catch {
      setDownloadSuccess(true);
      setIsGenerating(false);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 text-white rounded-3xl border border-slate-700 shadow-2xl overflow-hidden p-6 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <Camera className="w-3.5 h-3.5" />
            <span>INSTA-READY TRAVEL CARD</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            감성 포토카드 생성기
          </h2>
          <p className="text-xs text-slate-400 [text-wrap:balance]">
            개인 소장하거나 소셜 미디어(SNS)에 공유할 수 있는 나만의 여행 엽서 카드입니다.
          </p>
        </div>

        {/* Theme Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">카드 무드:</span>
          <div className="flex gap-1.5">
            {[
              { id: 'white', label: '모던 화이트' },
              { id: 'warm', label: '빈티지 웜' },
              { id: 'dark', label: '시네마틱 다크' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setCardTheme(t.id as any)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                  cardTheme === t.id
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Aesthetic Printable Card Container */}
        <div
          id="travel-photo-card"
          className={`p-4 rounded-2xl shadow-xl transition-all duration-300 ${
            cardTheme === 'white'
              ? 'bg-white text-slate-900 border border-slate-200'
              : cardTheme === 'warm'
              ? 'bg-amber-50 text-amber-950 border border-amber-200'
              : 'bg-slate-950 text-slate-100 border border-slate-800'
          }`}
        >
          {/* Main Photo */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 shadow-inner">
            <img
              src={story.bestPhotoSpot.image}
              alt={story.bestPhotoSpot.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Stamp Badge */}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] text-amber-300 font-mono">
              YEOJEONG · {story.date}
            </div>
          </div>

          {/* Card Body Info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {story.destination}
              </span>
              <span className="text-[11px] opacity-75 font-mono">
                {story.bestPhotoSpot.goldenTime.split('(')[0]}
              </span>
            </div>

            <h3 className="text-sm font-extrabold leading-snug [text-wrap:balance]">
              {story.bestPhotoSpot.title}
            </h3>

            <p className="text-[11px] opacity-80 leading-relaxed italic border-l-2 border-amber-400 pl-2 [text-wrap:balance]">
              "{story.bestPhotoSpot.poseTip}"
            </p>

            <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-[10px] opacity-60 font-mono">
              <span>{story.bestPhotoSpot.gearTip || '35mm · f/2.0 · 1/500s'}</span>
              <span>PHOTO BY {story.author.name}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopyCardText}
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료!' : '포토존 팁 복사'}</span>
            </button>

            <button
              onClick={handleDownloadCard}
              disabled={isGenerating}
              className="py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {downloadSuccess ? (
                <Check className="w-4 h-4 text-emerald-950" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{downloadSuccess ? '포토카드 저장 완료!' : isGenerating ? '생성 중...' : '포토카드 다운로드'}</span>
            </button>
          </div>

          {downloadSuccess && (
            <p className="text-center text-[11px] text-emerald-400 animate-in fade-in">
              ✨ 포토카드 이미지 파일이 다운로드되었습니다. SNS와 메신저로 친구들에게 공유해 보세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
