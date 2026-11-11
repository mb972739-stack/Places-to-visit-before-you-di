import React, { useState } from 'react';
import { X, Heart, Bookmark, MapPin, Camera, Clock, Sparkles, Share2, MessageSquare, Send, Check } from 'lucide-react';
import { TravelStory, StoryComment } from '../types';

interface StoryDetailModalProps {
  story: TravelStory | null;
  onClose: () => void;
  onLike: (id: string, e: React.MouseEvent) => void;
  onScrap: (id: string, e: React.MouseEvent) => void;
  isLiked: boolean;
  isScrapped: boolean;
  onOpenCardGenerator: (story: TravelStory) => void;
  onAddComment: (storyId: string, comment: StoryComment) => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onLike,
  onScrap,
  isLiked,
  isScrapped,
  onOpenCardGenerator,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [selectedStamp, setSelectedStamp] = useState('📸 인생샷 인정');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!story) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj: StoryComment = {
      id: `comm-${Date.now()}`,
      user: '나 (여행자)',
      comment: newComment.trim(),
      date: '방금 전',
      stamp: selectedStamp,
    };

    onAddComment(story.id, commentObj);
    setNewComment('');
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const stampOptions = ['📸 인생샷 인정', '✈️ 이번 주말 각', '🗺️ 지도 저장', '💡 꿀팁 감사'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span className="font-bold text-slate-800">{story.destination}</span>
            <span aria-hidden="true">·</span>
            <span>{story.region}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareLink}
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="링크 복사"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => onLike(story.id, e)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isLiked ? 'text-rose-500 bg-rose-50' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="좋아요"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => onScrap(story.id, e)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isScrapped ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="스크랩 저장"
            >
              <Bookmark className={`w-4 h-4 ${isScrapped ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Banner */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={story.heroImage}
              alt={story.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-semibold text-amber-300">
                {story.theme} 테마 여행기
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-1 leading-tight [text-wrap:balance]">
                {story.title}
              </h1>
            </div>
          </div>

          {/* Author Profile Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <img
                src={story.author.avatar}
                alt={story.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{story.author.name}</span>
                  <span className="text-xs text-slate-400 font-mono">{story.author.handle}</span>
                </div>
                <div className="text-xs text-amber-600 font-medium">{story.author.badge}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
              <span>{story.date}</span>
              <span>·</span>
              <span>조회 {story.views.toLocaleString()}</span>
              <span>·</span>
              <span>좋아요 {story.likes}</span>
              <span>·</span>
              <span>스크랩 {story.scraps}</span>
            </div>
          </div>

          {/* Core Feature: Signature Best Photo Spot Guide */}
          <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Camera className="w-4 h-4 text-amber-600" />
                <span>베스트 포토존 및 인생샷 촬영 공식</span>
              </div>
              <button
                onClick={() => onOpenCardGenerator(story)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-300 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>인생샷 포토카드 만들기</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-5 rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 shadow-sm">
                <img
                  src={story.bestPhotoSpot.image}
                  alt={story.bestPhotoSpot.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 [text-wrap:balance]">
                  {story.bestPhotoSpot.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>추천 골든아워: <strong>{story.bestPhotoSpot.goldenTime}</strong></span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="p-3 bg-white/80 rounded-xl border border-amber-100">
                    <span className="font-bold text-slate-900 block mb-1">📐 추천 카메라 구도 및 앵글:</span>
                    <p className="leading-relaxed [text-wrap:balance]">{story.bestPhotoSpot.cameraAngleTip}</p>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-amber-100">
                    <span className="font-bold text-slate-900 block mb-1">💃 추천 포즈 및 자연스러운 연출:</span>
                    <p className="leading-relaxed [text-wrap:balance]">{story.bestPhotoSpot.poseTip}</p>
                  </div>

                  {story.bestPhotoSpot.gearTip && (
                    <div className="text-[11px] text-slate-500 font-mono pt-1">
                      장비/렌즈 권장: {story.bestPhotoSpot.gearTip}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Travel Notes & Impressions */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              여행자의 메모 및 소회
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200 [text-wrap:balance]">
              {story.travelNotes}
            </p>
            {story.budgetSummary && (
              <div className="text-xs text-slate-500 font-mono">
                💡 여행 경비 요약: {story.budgetSummary}
              </div>
            )}
          </div>

          {/* Daily Itinerary Timeline */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              여행 동선 타임라인 코스
            </h3>

            <div className="space-y-6">
              {story.itinerary.map((day) => (
                <div key={day.day} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-xs">
                        DAY {day.day}
                      </span>
                      <span>{day.title}</span>
                    </h4>
                  </div>

                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {day.stops.map((stop, sIdx) => (
                      <div key={sIdx} className="relative group">
                        <div
                          className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-white ${
                            stop.isPhotoSpot ? 'bg-amber-500 ring-2 ring-amber-200' : 'bg-slate-400'
                          }`}
                        />
                        <div className="text-xs space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-slate-400">{stop.time}</span>
                            <span className="font-bold text-slate-800">{stop.place}</span>
                            {stop.isPhotoSpot && (
                              <span className="text-[10px] text-amber-700 font-semibold px-1.5 py-0.2 bg-amber-50 rounded">
                                포토존
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed [text-wrap:balance]">{stop.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Gems Section */}
          {story.hiddenGems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>이 지역 꼭 가봐야 할 숨은 명소</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {story.hiddenGems.map((gem, gIdx) => (
                  <div key={gIdx} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{gem.name}</h4>
                      <span className="text-[11px] text-emerald-700 font-medium">{gem.category}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed [text-wrap:balance]">{gem.description}</p>
                    <div className="pt-2 border-t border-emerald-100 text-xs text-emerald-900 font-medium">
                      💡 로컬 꿀팁: {gem.localTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traveler Reviews & Reaction Comments */}
          <div className="pt-6 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-700" />
                <span>여행자 한 줄 평 및 반응 스탬프 ({story.comments.length})</span>
              </h3>
            </div>

            {/* Comment List */}
            <div className="space-y-3">
              {story.comments.map((comm) => (
                <div key={comm.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{comm.user}</span>
                      {comm.stamp && (
                        <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                          {comm.stamp}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 [text-wrap:balance]">{comm.comment}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{comm.date}</span>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">반응 스탬프:</span>
                {stampOptions.map((stamp) => (
                  <button
                    key={stamp}
                    type="button"
                    onClick={() => setSelectedStamp(stamp)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedStamp === stamp
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {stamp}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="포토존 후기나 나만의 생생한 꿀팁을 남겨주세요!"
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>남기기</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
