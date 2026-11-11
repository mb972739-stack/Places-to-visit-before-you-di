import React, { useState } from 'react';
import { X, Sparkles, Camera, MapPin, ArrowRight, Loader2, Copy, Check, Compass } from 'lucide-react';
import { AiPhotoSpotResult } from '../types';

interface AiPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToStory: (data: any) => void;
}

export const AiPlannerModal: React.FC<AiPlannerModalProps> = ({
  isOpen,
  onClose,
  onApplyToStory,
}) => {
  const [destinationInput, setDestinationInput] = useState('');
  const [travelTheme] = useState('감성 인생샷 & 여유로운 힐링');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPhotoSpotResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/ai-photospot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: destinationInput.trim(),
          travelTheme,
        }),
      });

      if (!response.ok) {
        throw new Error('포토존 정보를 불러오지 못했습니다.');
      }

      const data: AiPhotoSpotResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('일시적인 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCourse = () => {
    if (!result) return;
    const text = `✨ [여정 YEOJEONG - AI 포토존 및 여행 코스 추천]
📍 여행지: ${result.destination}
💬 "${result.catchphrase}"

📸 시그니처 포토존:
${result.photoSpots
  .map(
    (s, i) =>
      `${i + 1}. ${s.name} (${s.bestTime})
  - 앵글: ${s.cameraAngleTip}
  - 포즈: ${s.poseRecommendation}`
  )
  .join('\n\n')}

🌿 로컬 숨은 명소:
- ${result.hiddenGem.name} (${result.hiddenGem.category})
- ${result.hiddenGem.description}
- 꿀팁: ${result.hiddenGem.insiderTip}

🗓️ 추천 1일 여행 코스:
${result.recommendedRoute.map((r) => `· ${r}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseInStory = () => {
    if (!result) return;
    onApplyToStory({
      destination: result.destination,
      title: `${result.destination} 감성 포토존 및 힐링 여정`,
      bestPhotoSpot: {
        title: result.photoSpots[0]?.name || '',
        goldenTime: result.photoSpots[0]?.bestTime || '',
        cameraAngleTip: result.photoSpots[0]?.cameraAngleTip || '',
        poseTip: result.photoSpots[0]?.poseRecommendation || '',
      },
      hiddenGems: [
        {
          name: result.hiddenGem.name,
          category: result.hiddenGem.category,
          description: result.hiddenGem.description,
          localTip: result.hiddenGem.insiderTip,
        },
      ],
      travelNotes: result.catchphrase,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>AI TRAVEL CURATOR</span>
            </div>
            <h2 className="text-lg font-bold">
              AI 포토존 및 로컬 여행 코스 플래너
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Input Form */}
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                가고 싶은 여행지나 도시 이름
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  placeholder="예: 경주 황리단길, 후쿠오카 유후인, 단양 패러글라이딩, 제주 우도"
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{loading ? '인생샷 분석 중...' : '포토존 코스 생성'}</span>
                </button>
              </div>
            </div>

            {/* Quick destination suggestion buttons */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
              <span className="font-semibold text-slate-600">추천 여행지:</span>
              {['경주 황리단길', '제주 우도', '후쿠오카 유후인', '여수 밤바다', '남해 독일마을'].map((place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => setDestinationInput(place)}
                  className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 transition-colors cursor-pointer"
                >
                  {place}
                </button>
              ))}
            </div>
          </form>

          {errorMsg && (
            <div className="p-3 text-xs text-rose-700 bg-rose-50 rounded-xl border border-rose-200">
              {errorMsg}
            </div>
          )}

          {/* AI Result Showcase */}
          {result && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 animate-in slide-in-from-bottom-2 duration-300">
              {/* Destination Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>{result.destination}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 [text-wrap:balance]">
                  "{result.catchphrase}"
                </h3>
              </div>

              {/* 2 Signature Photo Spots */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>추천 시그니처 포토존 ({result.photoSpots.length}곳)</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.photoSpots.map((spot, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900">{spot.name}</h4>
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono font-medium">
                          {spot.bestTime}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 space-y-1">
                        <p><strong>구도:</strong> {spot.cameraAngleTip}</p>
                        <p><strong>포즈:</strong> {spot.poseRecommendation}</p>
                        {spot.specialNote && <p className="text-slate-500 italic">💡 {spot.specialNote}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hidden Gem */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-emerald-700" />
                    <span>로컬 숨은 명소: {result.hiddenGem.name}</span>
                  </span>
                  <span className="text-[10px] text-emerald-800 font-semibold">{result.hiddenGem.category}</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed [text-wrap:balance]">{result.hiddenGem.description}</p>
                <p className="text-[11px] text-emerald-800 font-medium">💡 현지 팁: {result.hiddenGem.insiderTip}</p>
              </div>

              {/* Recommended Route */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800">추천 1일 포토 루트</span>
                <div className="space-y-1">
                  {result.recommendedRoute.map((stop, sIdx) => (
                    <div key={sIdx} className="text-xs text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      <span>{stop}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={handleCopyCourse}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사 완료!' : '코스 텍스트 복사'}</span>
                </button>

                <button
                  onClick={handleUseInStory}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <span>이 코스로 여행기 작성하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
