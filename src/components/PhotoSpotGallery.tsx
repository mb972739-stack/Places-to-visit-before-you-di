import React from 'react';
import { Camera, ArrowRight, SunMedium, Sparkles, Navigation } from 'lucide-react';
import { TravelStory, SpotTheme } from '../types';

interface PhotoSpotGalleryProps {
  stories: TravelStory[];
  onSelectStory: (story: TravelStory) => void;
  onOpenCardGenerator: (story: TravelStory) => void;
}

export const PhotoSpotGallery: React.FC<PhotoSpotGalleryProps> = ({
  stories,
  onSelectStory,
  onOpenCardGenerator,
}) => {
  const [selectedTheme, setSelectedTheme] = React.useState<SpotTheme>('전체');

  const themes: SpotTheme[] = ['전체', '골든아워', '오션뷰', '숲&자연', '카페&골목'];

  const filteredStories = stories.filter((s) => {
    if (selectedTheme === '전체') return true;
    return s.theme === selectedTheme;
  });

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
              <Camera className="w-4 h-4" />
              <span>SIGNATURE PHOTO SPOTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
              빛과 각도가 빚어낸 기적, 베스트 포토존 아카이브
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed [text-wrap:balance]">
              어느 계절 몇 시에 가야 가장 완벽한 자연광을 만날 수 있을까요? 
              실제 여행 사진작가들이 검증한 촬영 구도와 포즈 노하우를 한눈에 확인해 보세요.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented controls) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 overflow-x-auto">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedTheme === theme
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Spot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              {/* Image Preview with Golden Hour Meter */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={story.bestPhotoSpot.image}
                  alt={story.bestPhotoSpot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Golden Hour Tag */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-amber-300 font-medium flex items-center gap-1.5">
                  <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                  <span>{story.bestPhotoSpot.goldenTime}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] text-slate-300 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-amber-400" />
                    <span className="truncate">{story.destination}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5 line-clamp-1">
                    {story.bestPhotoSpot.title}
                  </h3>
                </div>
              </div>

              {/* Composition & Camera Tips */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Framing Tip */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-slate-700" />
                      <span>추천 촬영 구도 및 앵글</span>
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {story.bestPhotoSpot.cameraAngleTip}
                    </p>
                  </div>

                  {/* Pose Tip */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>추천 포즈 및 연출 방법</span>
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/50 p-2.5 rounded-lg border border-amber-100/60">
                      {story.bestPhotoSpot.poseTip}
                    </p>
                  </div>

                  {story.bestPhotoSpot.gearTip && (
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="font-sans font-semibold text-slate-700">추천 렌즈:</span>
                      <span>{story.bestPhotoSpot.gearTip}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenCardGenerator(story)}
                    className="text-xs text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    포토카드 만들기
                  </button>
                  <button
                    onClick={() => onSelectStory(story)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 py-2 px-3.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>여행기 전체 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
