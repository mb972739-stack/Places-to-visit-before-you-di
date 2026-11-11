import React, { useState } from 'react';
import { X, Camera, Sparkles } from 'lucide-react';
import { TravelStory, Region, SpotTheme } from '../types';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (story: TravelStory) => void;
  initialData?: Partial<TravelStory>;
}

const PRESET_IMAGES = [
  { label: '청록빛 바다 & 유채꽃', url: '/src/assets/images/photospot_jeju_ocean_1794378957600.jpg' },
  { label: '고요한 대나무 숲길', url: '/src/assets/images/photospot_kyoto_bamboo_1794378958324.jpg' },
  { label: '웅장한 설산 & 샬레', url: '/src/assets/images/photospot_swiss_alps_1794378958360.jpg' },
  { label: '낭만 노천 카페', url: '/src/assets/images/photospot_paris_cafe_1794378959524.jpg' },
  { label: '해안 절벽 파노라마', url: '/src/assets/images/hero_travel_scenic_1794378956160.jpg' },
];

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [destination, setDestination] = useState(initialData?.destination || '');
  const [region, setRegion] = useState<Region>(initialData?.region || '국내');
  const [theme, setTheme] = useState<SpotTheme>(initialData?.theme || '골든아워');
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || PRESET_IMAGES[0].url);

  // Photo Spot
  const [spotTitle, setSpotTitle] = useState(initialData?.bestPhotoSpot?.title || '');
  const [spotGoldenTime, setSpotGoldenTime] = useState(initialData?.bestPhotoSpot?.goldenTime || '오후 5시 ~ 6시 (골든아워)');
  const [spotAngleTip, setSpotAngleTip] = useState(initialData?.bestPhotoSpot?.cameraAngleTip || '');
  const [spotPoseTip, setSpotPoseTip] = useState(initialData?.bestPhotoSpot?.poseTip || '');

  // Hidden Gem
  const [gemName, setGemName] = useState(initialData?.hiddenGems?.[0]?.name || '');
  const [gemDescription, setGemDescription] = useState(initialData?.hiddenGems?.[0]?.description || '');
  const [gemLocalTip, setGemLocalTip] = useState(initialData?.hiddenGems?.[0]?.localTip || '');

  // Notes
  const [travelNotes, setTravelNotes] = useState(initialData?.travelNotes || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !destination.trim()) {
      alert('여행기 제목과 여행지를 입력해 주세요.');
      return;
    }

    const newStory: TravelStory = {
      id: `story-${Date.now()}`,
      title: title.trim(),
      destination: destination.trim(),
      region,
      theme,
      author: {
        name: '나만의 여정',
        handle: '@my_voyage',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        badge: '새싹 여행자',
      },
      date: '2026.05',
      heroImage,
      likes: 1,
      scraps: 1,
      views: 12,
      tags: [destination, theme, '직접다녀온후기'],
      bestPhotoSpot: {
        title: spotTitle.trim() || `${destination} 시그니처 뷰포인트`,
        location: destination,
        goldenTime: spotGoldenTime,
        cameraAngleTip: spotAngleTip.trim() || '수평선을 안정적으로 맞추고 자연광을 등지지 않게 촬영해 보세요.',
        poseTip: spotPoseTip.trim() || '먼 풍경을 자연스럽게 바라보는 감성적인 실루엣 샷.',
        image: heroImage,
      },
      hiddenGems: gemName.trim()
        ? [
            {
              name: gemName.trim(),
              category: '숨은 명소',
              description: gemDescription.trim() || '지역 주민들이 애정하는 한적하고 조용한 공간입니다.',
              localTip: gemLocalTip.trim() || '여유 있는 시간대에 방문해 보시기 바랍니다.',
            },
          ]
        : [],
      itinerary: [
        {
          day: 1,
          title: `${destination} 인생샷 탐방 코스`,
          stops: [
            { time: '11:00', place: `${destination} 도착 및 산책`, note: '설레는 첫 시작' },
            { time: '16:30', place: spotTitle || '시그니처 포토존', note: '골든아워 인생샷 촬영', isPhotoSpot: true },
          ],
        },
      ],
      travelNotes: travelNotes.trim() || '빛과 바람이 조화로웠던 아름다운 여행. 또 하나의 잊지 못할 기록을 남겼습니다.',
      comments: [],
      isUserCreated: true,
    };

    onSubmit(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-400" />
              <span>나만의 여행기 및 포토존 기록하기</span>
            </h2>
            <p className="text-xs text-slate-300">
              직접 발견한 최고의 포토존과 촬영 노하우를 다른 여행자들과 나누어 보세요.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>1. 기본 여행 정보</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  여행지 이름 *
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="예: 제주 구좌읍, 교토 아라시야마, 스위스 그린델발트"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  여행 지역
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as Region)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="국내">국내</option>
                  <option value="일본/동아시아">일본/동아시아</option>
                  <option value="유럽">유럽</option>
                  <option value="동남아">동남아</option>
                  <option value="미주/기타">미주/기타</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                여행기 제목 *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 에메랄드빛 바람과 유채꽃 절벽, 제주 동쪽 3박 4일 여정"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Photo Preset Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                대표 사진 선택 (고화질 포토존 프리셋)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESET_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroImage(img.url)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                      heroImage === img.url
                        ? 'border-amber-500 ring-2 ring-amber-200'
                        : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 px-1 text-[9px] text-white truncate text-center">
                      {img.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Best Photo Spot */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-600" />
              <span>2. 베스트 포토존 및 인생샷 팁 (핵심)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  포토존 명소 이름
                </label>
                <input
                  type="text"
                  value={spotTitle}
                  onChange={(e) => setSpotTitle(e.target.value)}
                  placeholder="예: 성산 해안 절벽 목재 벤치 포인트"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  추천 촬영 시간 (골든아워)
                </label>
                <input
                  type="text"
                  value={spotGoldenTime}
                  onChange={(e) => setSpotGoldenTime(e.target.value)}
                  placeholder="예: 오후 4시 30분 ~ 5시 30분 (일몰 직전)"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                촬영 구도 및 카메라 앵글 팁
              </label>
              <textarea
                rows={2}
                value={spotAngleTip}
                onChange={(e) => setSpotAngleTip(e.target.value)}
                placeholder="예: 수평선을 화면 하단 3분의 1에 두고 2배 줌으로 촬영하세요. 전경에 유채꽃을 걸치면 몽환적인 분위기가 연출됩니다."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                추천 포즈 및 연출 팁
              </label>
              <input
                type="text"
                value={spotPoseTip}
                onChange={(e) => setSpotPoseTip(e.target.value)}
                placeholder="예: 먼 바다를 바라보며 모자를 살짝 잡는 자연스러운 실루엣 구도"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Section 3: Hidden Gem */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>3. 꼭 가봐야 할 숨은 명소 (선택 사항)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  숨은 명소 이름
                </label>
                <input
                  type="text"
                  value={gemName}
                  onChange={(e) => setGemName(e.target.value)}
                  placeholder="예: 구좌읍 돌담길 숨은 팽나무 쉼터"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  현지인 로컬 꿀팁
                </label>
                <input
                  type="text"
                  value={gemLocalTip}
                  onChange={(e) => setGemLocalTip(e.target.value)}
                  placeholder="예: 오전 10시 무렵 방문하면 돌담 그림자가 감성적입니다."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Travel Notes */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-900">
              여행 메모 및 한 줄 소회
            </label>
            <textarea
              rows={3}
              value={travelNotes}
              onChange={(e) => setTravelNotes(e.target.value)}
              placeholder="이번 여정에서 느낀 감정이나 다른 여행자들에게 전하고 싶은 따뜻한 한마디를 적어주세요."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
            >
              여행기 발행하고 스탬프 받기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
