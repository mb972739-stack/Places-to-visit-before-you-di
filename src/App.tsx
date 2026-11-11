import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoryCard } from './components/StoryCard';
import { PhotoSpotGallery } from './components/PhotoSpotGallery';
import { HiddenGemSection } from './components/HiddenGemSection';
import { TravelPrepSection } from './components/TravelPrepSection';
import { TravelRouletteModal } from './components/TravelRouletteModal';
import { PassportModal } from './components/PassportModal';
import { PhotoCardGeneratorModal } from './components/PhotoCardGeneratorModal';
import { CreateStoryModal } from './components/CreateStoryModal';
import { AiPlannerModal } from './components/AiPlannerModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import { INITIAL_STORIES, INITIAL_STAMPS } from './data/initialStories';
import { TravelStory, StampItem, Region, StoryComment } from './types';
import { Award, Camera } from 'lucide-react';

export default function App() {
  // Stories state with localStorage persistence
  const [stories, setStories] = useState<TravelStory[]>(() => {
    try {
      const saved = localStorage.getItem('yeojeong_travel_stories');
      return saved ? JSON.parse(saved) : INITIAL_STORIES;
    } catch {
      return INITIAL_STORIES;
    }
  });

  // Stamps state with localStorage persistence
  const [stamps, setStamps] = useState<StampItem[]>(() => {
    try {
      const saved = localStorage.getItem('yeojeong_travel_stamps');
      return saved ? JSON.parse(saved) : INITIAL_STAMPS;
    } catch {
      return INITIAL_STAMPS;
    }
  });

  // Likes and Scraps
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yeojeong_liked_ids');
      return saved ? JSON.parse(saved) : ['jeju-ocean-2026'];
    } catch {
      return ['jeju-ocean-2026'];
    }
  });

  const [scrappedIds, setScrappedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yeojeong_scrapped_ids');
      return saved ? JSON.parse(saved) : ['swiss-alps-2026', 'kyoto-bamboo-2026'];
    } catch {
      return ['swiss-alps-2026', 'kyoto-bamboo-2026'];
    }
  });

  // UI Navigation & Filters
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [selectedRegion, setSelectedRegion] = useState<Region>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'scraps'>('latest');

  // Modals state
  const [selectedStory, setSelectedStory] = useState<TravelStory | null>(null);
  const [photoCardStory, setPhotoCardStory] = useState<TravelStory | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);
  const [aiPrefillData, setAiPrefillData] = useState<any>(null);

  // Toast notification for unlocked stamps
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist stories, stamps, likes, scraps
  useEffect(() => {
    try {
      localStorage.setItem('yeojeong_travel_stories', JSON.stringify(stories));
    } catch (e) {
      console.error(e);
    }
  }, [stories]);

  useEffect(() => {
    try {
      localStorage.setItem('yeojeong_travel_stamps', JSON.stringify(stamps));
    } catch (e) {
      console.error(e);
    }
  }, [stamps]);

  useEffect(() => {
    try {
      localStorage.setItem('yeojeong_liked_ids', JSON.stringify(likedIds));
    } catch (e) {
      console.error(e);
    }
  }, [likedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('yeojeong_scrapped_ids', JSON.stringify(scrappedIds));
    } catch (e) {
      console.error(e);
    }
  }, [scrappedIds]);

  // Stamp unlocking helper
  const unlockStamp = (stampId: string) => {
    setStamps((prev) => {
      const target = prev.find((s) => s.id === stampId);
      if (target && !target.isUnlocked) {
        showToast(`🎉 새로운 여권 스탬프 획득: [${target.name}]!`);
        return prev.map((s) =>
          s.id === stampId
            ? { ...s, isUnlocked: true, unlockedAt: new Date().toISOString().slice(0, 10).replace(/-/g, '.') }
            : s
        );
      }
      return prev;
    });
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadyLiked = likedIds.includes(id);
    setLikedIds((prev) =>
      isAlreadyLiked ? prev.filter((item) => item !== id) : [...prev, id]
    );

    setStories((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, likes: isAlreadyLiked ? s.likes - 1 : s.likes + 1 } : s
      )
    );

    if (!isAlreadyLiked) {
      // Trigger stamp unlock
      if (id.includes('swiss')) unlockStamp('stamp-swiss');
      if (id.includes('paris')) unlockStamp('stamp-paris');
      if (likedIds.length + 1 >= 3) unlockStamp('stamp-photographer');
    }
  };

  const handleScrap = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadyScrapped = scrappedIds.includes(id);
    setScrappedIds((prev) =>
      isAlreadyScrapped ? prev.filter((item) => item !== id) : [...prev, id]
    );

    setStories((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, scraps: isAlreadyScrapped ? s.scraps - 1 : s.scraps + 1 } : s
      )
    );

    if (!isAlreadyScrapped) {
      showToast('📌 마이 버킷리스트에 안전하게 저장되었습니다.');
      if (id.includes('swiss')) unlockStamp('stamp-swiss');
      if (id.includes('paris')) unlockStamp('stamp-paris');
      if (scrappedIds.length + 1 >= 3) unlockStamp('stamp-photographer');
    }
  };

  const handleCreateStory = (newStory: TravelStory) => {
    setStories([newStory, ...stories]);
    unlockStamp('stamp-creator');
    showToast('✨ 새로운 여행기가 등록되었습니다! [첫 여정 작가 뱃지] 획득!');
    setSelectedStory(newStory);
  };

  const handleAddComment = (storyId: string, comment: StoryComment) => {
    setStories((prev) =>
      prev.map((s) =>
        s.id === storyId ? { ...s, comments: [comment, ...s.comments] } : s
      )
    );
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory({
        ...selectedStory,
        comments: [comment, ...selectedStory.comments],
      });
    }
    showToast('💬 소중한 한 줄 평과 반응 스탬프가 등록되었습니다.');
  };

  const regions: Region[] = ['전체', '국내', '일본/동아시아', '유럽', '동남아', '미주/기타'];

  // Filtered stories logic
  const filteredStories = stories
    .filter((story) => {
      if (selectedRegion !== '전체' && story.region !== selectedRegion) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = story.title.toLowerCase().includes(q);
        const matchDest = story.destination.toLowerCase().includes(q);
        const matchTags = story.tags.some((t) => t.toLowerCase().includes(q));
        const matchSpot = story.bestPhotoSpot.title.toLowerCase().includes(q);
        if (!matchTitle && !matchDest && !matchTags && !matchSpot) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.likes - a.likes;
      if (sortBy === 'scraps') return b.scraps - a.scraps;
      return 0; // default latest
    });

  const unlockedStampsCount = stamps.filter((s) => s.isUnlocked).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-3 duration-300">
          <Award className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-bold leading-normal">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar (§2 Top Bar Contract) */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCreateModal={() => {
          setAiPrefillData(null);
          setIsCreateOpen(true);
        }}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenRoulette={() => setIsRouletteOpen(true)}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
        unlockedStampsCount={unlockedStampsCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenRoulette={() => setIsRouletteOpen(true)}
          onQuickSearchTag={(tag) => {
            setSearchQuery(tag);
            setActiveTab('feed');
          }}
        />

        {/* Tab 1: Feed View */}
        {activeTab === 'feed' && (
          <section className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Filter & Sort Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                {/* Region Filter */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        selectedRegion === region
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs text-slate-400 font-medium">정렬:</span>
                  <div className="flex gap-1">
                    {[
                      { key: 'latest', label: '최신순' },
                      { key: 'popular', label: '인기순' },
                      { key: 'scraps', label: '스크랩순' },
                    ].map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setSortBy(s.key as any)}
                        className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                          sortBy === s.key
                            ? 'bg-slate-900 text-white font-bold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Story Grid */}
              {filteredStories.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Camera className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-700 [text-wrap:balance]">
                    검색 조건과 일치하는 여행기가 없습니다.
                  </h3>
                  <p className="text-xs text-slate-500 [text-wrap:balance]">
                    다른 키워드로 검색하시거나, 나만의 첫 포토존 여행기를 직접 등록해 보세요!
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('전체');
                    }}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    필터 초기화
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStories.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      onSelect={(s) => setSelectedStory(s)}
                      onLike={handleLike}
                      onScrap={handleScrap}
                      isLiked={likedIds.includes(story.id)}
                      isScrapped={scrappedIds.includes(story.id)}
                      onGenerateCard={(s, e) => {
                        e.stopPropagation();
                        setPhotoCardStory(s);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tab 2: Best Photo Spots Gallery */}
        {activeTab === 'photospots' && (
          <PhotoSpotGallery
            stories={stories}
            onSelectStory={(s) => setSelectedStory(s)}
            onOpenCardGenerator={(s) => setPhotoCardStory(s)}
          />
        )}

        {/* Tab 3: Hidden Gems Section */}
        {activeTab === 'hiddengems' && (
          <HiddenGemSection
            stories={stories}
            onSelectStory={(s) => setSelectedStory(s)}
          />
        )}

        {/* Always display Travel Preparation Section for immediate convenience */}
        <TravelPrepSection />

        {/* Bottom Community Highlight Section */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              직접 발견한 특별한 뷰포인트를 들려주세요
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed [text-wrap:balance]">
              내가 촬영한 인생샷 명소, 노을이 지는 황금 시간대, 골목길 숨은 쉼터까지.
              당신의 소중한 기록이 다른 여행자에게는 잊지 못할 추억의 나침반이 됩니다.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setAiPrefillData(null);
                  setIsCreateOpen(true);
                }}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                + 나의 인생샷 및 여행기 공유하기
              </button>
              <button
                onClick={() => setIsAiPlannerOpen(true)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                AI에게 새로운 여행지 추천받기
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">여정 YEOJEONG</span>
            <span>·</span>
            <span>감성 여행 및 베스트 포토존 아카이브</span>
          </div>
          <div>
            © 2026 여정 YEOJEONG. 모든 여행자의 빛나는 순간을 진심으로 응원합니다.
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <StoryDetailModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onLike={handleLike}
        onScrap={handleScrap}
        isLiked={selectedStory ? likedIds.includes(selectedStory.id) : false}
        isScrapped={selectedStory ? scrappedIds.includes(selectedStory.id) : false}
        onOpenCardGenerator={(s) => setPhotoCardStory(s)}
        onAddComment={handleAddComment}
      />

      <PhotoCardGeneratorModal
        story={photoCardStory}
        onClose={() => setPhotoCardStory(null)}
      />

      <TravelRouletteModal
        isOpen={isRouletteOpen}
        onClose={() => setIsRouletteOpen(false)}
        stories={stories}
        onSelectStory={(s) => setSelectedStory(s)}
      />

      <PassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        stamps={stamps}
      />

      <CreateStoryModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateStory}
        initialData={aiPrefillData}
      />

      <AiPlannerModal
        isOpen={isAiPlannerOpen}
        onClose={() => setIsAiPlannerOpen(false)}
        onApplyToStory={(prefill) => {
          setAiPrefillData(prefill);
          setIsCreateOpen(true);
        }}
      />
    </div>
  );
}
