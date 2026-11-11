import React from 'react';
import { X, Award, CheckCircle2, Lock, Globe } from 'lucide-react';
import { StampItem } from '../types';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stamps: StampItem[];
}

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  stamps,
}) => {
  if (!isOpen) return null;

  const unlockedCount = stamps.filter((s) => s.isUnlocked).length;
  const progressPercent = Math.round((unlockedCount / stamps.length) * 100);

  const getRankTitle = (count: number) => {
    if (count >= 5) return '👑 마스터 트래블러 (Master Traveler)';
    if (count >= 3) return '🧭 골든아워 탐험가 (Golden Hour Explorer)';
    if (count >= 1) return '🌿 설레는 첫 발걸음 (Novice Wanderer)';
    return '🎒 여행 준비자 (Aspiring Voyager)';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Passport Cover Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5" />
              <span>DIGITAL TRAVELER PASSPORT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              나의 디지털 여행 여권
            </h2>
            <div className="text-xs text-slate-300 font-medium">
              현재 칭호: <span className="text-amber-300 font-bold">{getRankTitle(unlockedCount)}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Passport Progress Bar */}
        <div className="bg-slate-900 px-6 sm:px-8 pb-5 pt-0 text-white">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>스탬프 수집 달성률</span>
            <span className="font-mono text-amber-400 font-bold">
              {unlockedCount} / {stamps.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Passport Stamp Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-amber-50/30">
          <div className="text-xs text-slate-500 font-medium leading-relaxed">
            💡 여행기를 읽고 포토존 꿀팁을 스크랩하거나 나만의 여행기를 등록하면 새로운 여권 스탬프가 활성화됩니다!
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stamps.map((stamp) => (
              <div
                key={stamp.id}
                className={`relative p-5 rounded-2xl border transition-all ${
                  stamp.isUnlocked
                    ? 'bg-white border-amber-300 shadow-md ring-1 ring-amber-100'
                    : 'bg-slate-100/60 border-slate-200 opacity-60'
                }`}
              >
                {/* Stamp Circular Seal */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <span>[{stamp.code}]</span>
                      <span>·</span>
                      <span className="text-slate-600 font-sans font-medium">{stamp.region}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 [text-wrap:balance]">
                      {stamp.name}
                    </h3>
                  </div>

                  {stamp.isUnlocked ? (
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-600 flex flex-col items-center justify-center text-amber-700 -rotate-12 bg-amber-50/50 shadow-inner shrink-0">
                      <span className="text-[9px] font-black uppercase tracking-tighter">VERIFIED</span>
                      <Award className="w-4 h-4 text-amber-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed [text-wrap:balance]">
                  {stamp.description}
                </p>

                {stamp.isUnlocked && stamp.unlockedAt && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      스탬프 획득 완료
                    </span>
                    <span className="font-mono">{stamp.unlockedAt}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
