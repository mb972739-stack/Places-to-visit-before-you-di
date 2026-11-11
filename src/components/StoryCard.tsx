import React from 'react';
import { Heart, Bookmark, Eye, MapPin, Camera, Clock } from 'lucide-react';
import { TravelStory } from '../types';

interface StoryCardProps {
  story: TravelStory;
  onSelect: (story: TravelStory) => void;
  onLike: (id: string, e: React.MouseEvent) => void;
  onScrap: (id: string, e: React.MouseEvent) => void;
  isLiked: boolean;
  isScrapped: boolean;
  onGenerateCard: (story: TravelStory, e: React.MouseEvent) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onSelect,
  onLike,
  onScrap,
  isLiked,
  isScrapped,
  onGenerateCard,
}) => {
  return (
    <article
      onClick={() => onSelect(story)}
      className="group relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Media Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={story.heroImage}
          alt={story.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Quick Location & Region Floating Label */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <span>{story.destination}</span>
        </div>

        {/* Top Right Action Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => onLike(story.id, e)}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              isLiked
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/35 text-white hover:bg-black/60'
            }`}
            title="좋아요"
            aria-label="좋아요"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => onScrap(story.id, e)}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              isScrapped
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-black/35 text-white hover:bg-black/60'
            }`}
            title="스크랩 저장"
            aria-label="스크랩 저장"
          >
            <Bookmark className={`w-4 h-4 ${isScrapped ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Corner Golden Hour Teaser */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1.5 drop-shadow-md">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-medium truncate max-w-[200px]">{story.bestPhotoSpot.title}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-amber-200 drop-shadow-md">
            <Clock className="w-3 h-3" />
            <span>{story.bestPhotoSpot.goldenTime.split('(')[0]}</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata: Zero-Pill text with typographic bullet separators */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono">
            <span>{story.region}</span>
            <span aria-hidden="true">·</span>
            <span>{story.date}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 font-sans" />
              <span className="tabular-nums font-mono">{story.views.toLocaleString()}</span>
            </span>
          </div>

          {/* Primary Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug [text-wrap:balance]">
            {story.title}
          </h3>

          {/* Camera Angle & Composition Highlight Tip */}
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>인생샷 촬영 앵글:</span>
            </div>
            <p className="line-clamp-2 text-slate-600 text-[12px] leading-relaxed">
              {story.bestPhotoSpot.cameraAngleTip}
            </p>
          </div>
        </div>

        {/* Footer: Author Info & Polaroid Export Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={story.author.avatar}
              alt={story.author.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-xs font-semibold text-slate-800">{story.author.name}</div>
              <div className="text-[11px] text-slate-400">{story.author.badge}</div>
            </div>
          </div>

          <button
            onClick={(e) => onGenerateCard(story, e)}
            className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="인생샷 포토카드 미리보기"
          >
            <span>포토카드</span>
          </button>
        </div>
      </div>
    </article>
  );
};
