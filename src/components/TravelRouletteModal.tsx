import React, { useState } from 'react';
import { X, Compass, Sparkles, ArrowRight, RefreshCw, MapPin } from 'lucide-react';
import { TravelStory } from '../types';

interface TravelRouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: TravelStory[];
  onSelectStory: (story: TravelStory) => void;
}

export const TravelRouletteModal: React.FC<TravelRouletteModalProps> = ({
  isOpen,
  onClose,
  stories,
  onSelectStory,
}) => {
  const [mood, setMood] = useState<'nature' | 'urban' | 'ocean'>('ocean');
  const [mate, setMate] = useState<'solo' | 'couple' | 'friends'>('solo');
  const [isSpinning, setIsSpinning] = useState(false);
  const [matchedStory, setMatchedStory] = useState<TravelStory | null>(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    setIsSpinning(true);
    setMatchedStory(null);

    let count = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * stories.length);
      setMatchedStory(stories[randomIdx]);
      count++;
      if (count >= 12) {
        clearInterval(interval);
        // Find best match according to mood
        const pool = stories.filter((s) => {
          if (mood === 'ocean') return s.theme === '오션뷰';
          if (mood === 'nature') return s.theme === '숲&자연' || s.theme === '골든아워';
          return s.theme === '카페&골목';
        });
        const finalMatch = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : stories[0];
        setMatchedStory(finalMatch);
        setIsSpinning(false);
      }
    }, 120);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
            <Compass className="w-4 h-4 text-amber-600 animate-spin" />
            <span>오늘 떠나볼까?</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            취향 맞춤 여행지 룰렛
          </h2>
          <p className="text-xs text-slate-500 [text-wrap:balance]">
            현재 기분과 동행자를 선택하시면 가장 어울리는 인생샷 명소를 추천해 드립니다.
          </p>
        </div>

        {/* Question 1: Mood */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800">1. 지금 가장 끌리는 풍경은 무엇인가요?</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'ocean', label: '에메랄드빛 바다' },
              { key: 'nature', label: '청량한 숲과 설산' },
              { key: 'urban', label: '낭만적인 골목 카페' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setMood(item.key as any)}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  mood === item.key
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: Companion */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800">2. 누구와 함께 떠나시나요?</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'solo', label: '혼자만의 힐링' },
              { key: 'couple', label: '연인과의 로맨틱' },
              { key: 'friends', label: '친구들과 인생샷' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setMate(item.key as any)}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  mate === item.key
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spin CTA Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? '운명의 여행지를 찾는 중...' : '취향 저격 여행지 룰렛 돌리기'}</span>
        </button>

        {/* Matched Story Result Card */}
        {matchedStory && !isSpinning && (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>오늘 당신에게 딱 맞는 추천 여행지!</span>
            </div>

            <div className="flex gap-3 items-center">
              <img
                src={matchedStory.heroImage}
                alt={matchedStory.destination}
                className="w-20 h-20 rounded-xl object-cover ring-1 ring-amber-300 shrink-0"
              />
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  <span>{matchedStory.destination}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {matchedStory.title}
                </h4>
                <p className="text-xs text-amber-950 font-medium line-clamp-2">
                  포토존: {matchedStory.bestPhotoSpot.title} ({matchedStory.bestPhotoSpot.goldenTime})
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/60 flex justify-end">
              <button
                onClick={() => {
                  onClose();
                  onSelectStory(matchedStory);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-300 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
              >
                <span>이 여행기 자세히 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
