import React from 'react';
import { Sparkles, MapPin, Lightbulb, Compass, ArrowUpRight } from 'lucide-react';
import { TravelStory } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface HiddenGemSectionProps {
  stories: TravelStory[];
  onSelectStory: (story: TravelStory) => void;
}

export const HiddenGemSection: React.FC<HiddenGemSectionProps> = ({
  stories,
  onSelectStory,
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<string | null>(null);

  // Flatten hidden gems with parent story
  const gemList = stories.flatMap((story) =>
    story.hiddenGems.map((gem, idx) => ({
      ...gem,
      id: `${story.id}-gem-${idx}`,
      parentStory: story,
    }))
  );

  const handleCopyTip = async (tip: string, id: string) => {
    const success = await copyToClipboard(tip);
    if (success) {
      setCopiedIndex(id);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <Compass className="w-4 h-4" />
            <span>LOCALS ONLY · SECRET ARCHIVE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            관광 가이드북에는 없는 꼭 가봐야 할 숨은 명소
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed [text-wrap:balance]">
            대형 단체 관광버스가 닿지 않는 조용한 골목길 끝자락, 현지 주민들이 아끼는 비밀 찻집과 숨겨진 전망대를 모았습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gemList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.parentStory.destination}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-semibold">{item.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug [text-wrap:balance]">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Local Tip Box */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                      <span>현지인 로컬 꿀팁</span>
                    </span>
                    <button
                      onClick={() => handleCopyTip(item.localTip, item.id)}
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 underline font-medium cursor-pointer"
                    >
                      {copiedIndex === item.id ? '복사 완료!' : '팁 복사'}
                    </button>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    {item.localTip}
                  </p>
                </div>
              </div>

              {/* Footer link to parent story */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  작성자: {item.parentStory.author.name}
                </span>
                <button
                  onClick={() => onSelectStory(item.parentStory)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>전체 일정 보기</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
