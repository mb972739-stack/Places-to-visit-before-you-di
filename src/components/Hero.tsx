import React from 'react';
import { Search, Camera, Compass, MapPin } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenRoulette: () => void;
  onQuickSearchTag: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onOpenRoulette,
  onQuickSearchTag,
}) => {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden bg-slate-900 text-white">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950/80 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <Camera className="w-3.5 h-3.5" />
              <span>Travel Archive & Signature Photo Spot Guide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
              여행자들이 직접 찾은 <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300">
                인생샷 포토존
              </span>
              과 숨은 골목 이야기
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl [text-wrap:balance]">
              어느 시간대, 어떤 각도로 촬영해야 가장 아름다울까요? 현지인이 추천하는 비밀스러운 장소부터 
              실제 여행자들의 솔직한 일정과 구도 노하우까지 한자리에서 만나보세요.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="가고 싶은 여행지나 키워드를 검색해 보세요 (예: 제주, 교토, 유채꽃, 알프스)"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 text-xs text-slate-400 hover:text-white px-2 py-1 rounded cursor-pointer"
                  >
                    초기화
                  </button>
                )}
              </div>

              {/* Quick Tags */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500 font-medium">추천 검색어:</span>
                {['#제주동쪽', '#교토아라시야마', '#스위스알프스', '#파리노천카페', '#골든아워'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onQuickSearchTag(tag.replace('#', ''))}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Vibe Button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenRoulette}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>어디로 갈지 고민될 때? 취향 맞춤 룰렛 돌리기</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800">
              <img
                src="/src/assets/images/hero_travel_scenic_1794378956160.jpg"
                alt="탁 트인 해안 절벽과 에메랄드빛 바다"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Floating Camera Metadata Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-white">
                <div className="flex items-center justify-between text-xs text-amber-300 font-medium mb-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    동해안 절벽 해안 단구 전망 명소
                  </span>
                  <span>오전 6시 20분 골든아워</span>
                </div>
                <h3 className="text-sm font-bold text-white [text-wrap:balance]">
                  파도가 부서지는 순간, 수평선 3분할 앵글
                </h3>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>24mm</span>
                  <span>·</span>
                  <span>f/2.8</span>
                  <span>·</span>
                  <span>1/1000s</span>
                  <span>·</span>
                  <span>ISO 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1-Row Quantitative Proof Strip below Split */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">2,480+</div>
            <div className="text-xs text-slate-400 mt-1">검증된 베스트 포토존</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">14,920+</div>
            <div className="text-xs text-slate-400 mt-1">실시간 여행자 리뷰 및 팁</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">850+</div>
            <div className="text-xs text-slate-400 mt-1">로컬 숨은 맛집 및 쉼터</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono tabular-nums">98.4%</div>
            <div className="text-xs text-slate-400 mt-1">포토존 정보 만족도</div>
          </div>
        </div>
      </div>
    </section>
  );
};
