import React from 'react';
import { Compass, Sparkles, Award, Plus, Menu, X, Luggage } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenCreateModal: () => void;
  onOpenPassport: () => void;
  onOpenRoulette: () => void;
  onOpenAiPlanner: () => void;
  unlockedStampsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCreateModal,
  onOpenPassport,
  onOpenRoulette,
  onOpenAiPlanner,
  unlockedStampsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: string) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('feed')}
            className="text-left text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-amber-600 transition-colors cursor-pointer"
          >
            여정 YEOJEONG
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('feed')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'feed' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-1' : ''
              }`}
            >
              여행 피드
            </button>
            <button
              onClick={() => handleNavClick('photospots')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'photospots' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-1' : ''
              }`}
            >
              베스트 포토존
            </button>
            <button
              onClick={() => handleNavClick('hiddengems')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'hiddengems' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-1' : ''
              }`}
            >
              숨은 명소
            </button>
            <button
              onClick={() => handleNavClick('prep')}
              className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'prep' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-1' : ''
              }`}
            >
              <Luggage className="w-4 h-4 text-amber-600" />
              <span>준비 가이드</span>
            </button>
            <button
              onClick={onOpenRoulette}
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-slate-600"
            >
              <Compass className="w-4 h-4 text-amber-600" />
              <span>취향 룰렛</span>
            </button>
            <button
              onClick={onOpenAiPlanner}
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-slate-600"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI 플래너</span>
            </button>
            <button
              onClick={onOpenPassport}
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-slate-600"
            >
              <Award className="w-4 h-4 text-indigo-600" />
              <span>여행 여권 ({unlockedStampsCount})</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>여행기 작성</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 cursor-pointer"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <button
            onClick={() => handleNavClick('feed')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-slate-900"
          >
            여행 피드
          </button>
          <button
            onClick={() => handleNavClick('photospots')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-slate-900"
          >
            베스트 포토존
          </button>
          <button
            onClick={() => handleNavClick('hiddengems')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-slate-900"
          >
            숨은 명소
          </button>
          <button
            onClick={() => handleNavClick('prep')}
            className="flex items-center gap-2 w-full text-left py-2 text-sm font-medium text-amber-800 hover:text-amber-900"
          >
            <Luggage className="w-4 h-4 text-amber-600" />
            <span>여행 준비 가이드</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRoulette();
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-sm font-medium text-amber-700"
          >
            <Compass className="w-4 h-4" />
            <span>취향 맞춤 여행지 룰렛</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAiPlanner();
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-sm font-medium text-emerald-700"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI 포토존 & 코스 플래너</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPassport();
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-sm font-medium text-indigo-700"
          >
            <Award className="w-4 h-4" />
            <span>내 디지털 여행 여권 ({unlockedStampsCount}개 획득)</span>
          </button>
        </div>
      )}
    </header>
  );
};
