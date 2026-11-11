import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Luggage, Plus, Trash2 } from 'lucide-react';

interface PrepItem {
  id: string;
  category: '필수 서류' | '금융 및 통신' | '의류 및 짐' | '카메라 및 사진' | '상비약 및 안전';
  text: string;
  tip?: string;
  checked: boolean;
}

const DEFAULT_PREP_ITEMS: PrepItem[] = [
  {
    id: 'p1',
    category: '필수 서류',
    text: '여권 유효기간 6개월 이상 확인 및 사본 보관',
    tip: '출국일 기준 유효기간이 6개월 이상 남아 있어야 입국이 거부되지 않습니다. 만일의 분실에 대비해 스마트폰 사진첩에 여권 사본을 미리 보관해 두세요.',
    checked: false,
  },
  {
    id: 'p2',
    category: '필수 서류',
    text: '전자 항공권(E-티켓) 및 숙소 예약 확인서 오프라인 저장',
    tip: '인터넷 연결이 원활하지 않은 입국 심사대나 공항 현장에서도 즉시 제시할 수 있도록 미리 화면을 캡처하거나 PDF 문서로 저장해 두세요.',
    checked: false,
  },
  {
    id: 'p3',
    category: '금융 및 통신',
    text: '트래블로그·트래블월렛 해외 결제 카드 발급 및 현지 통화 충전',
    tip: '환전 수수료 없이 현지 ATM에서 바로 출금할 수 있어 경제적입니다. 비상시를 대비해 일반 해외 결제 신용카드 1장을 별도로 챙기세요.',
    checked: false,
  },
  {
    id: 'p4',
    category: '금융 및 통신',
    text: '현지 이심(eSIM) 또는 유심(USIM) 사전 등록 및 설치 안내문 캡처',
    tip: '국내 유심을 번거롭게 교체할 필요 없는 이심(eSIM)이 편리합니다. 등록용 QR 코드는 오프라인에서도 확인할 수 있도록 미리 사진첩에 저장하세요.',
    checked: false,
  },
  {
    id: 'p5',
    category: '카메라 및 사진',
    text: '스마트폰 카메라 렌즈 클리너 및 극세사 천 지참',
    tip: '여행 사진이 흐리거나 빛 번짐이 생기는 원인의 90% 이상은 지문과 유분입니다. 셔터를 누르기 전 렌즈를 깨끗이 닦는 것만으로도 화질이 2배 선명해집니다.',
    checked: false,
  },
  {
    id: 'p6',
    category: '카메라 및 사진',
    text: '휴대용 블루투스 삼각대 및 고용량 보조 배터리 (10,000mAh 이상)',
    tip: '지도 검색과 사진 촬영으로 배터리 소모가 빠릅니다. 보조 배터리는 위탁 수하물이 아닌 반드시 기내 휴대 수하물로 소지해야 합니다.',
    checked: false,
  },
  {
    id: 'p7',
    category: '카메라 및 사진',
    text: '배경 풍경과 선명한 대비를 이루는 의상 코디 준비',
    tip: '푸른 바다 앞에서는 화이트나 옐로우, 울창한 숲에서는 베이지나 아이보리 톤의 의상이 인물을 한층 화사하고 돋보이게 만들어 줍니다.',
    checked: false,
  },
  {
    id: 'p8',
    category: '의류 및 짐',
    text: '기내 액체류 규정 준수 (100ml 이하 용기) 및 만능 여행용 멀티 어댑터',
    tip: '국제선 기내 반입 액체류는 개별 100ml 이하 용기에 담아 1L 투명 지퍼백 1개에 완전히 밀봉해야 합니다. 방문 국가별 플러그 규격도 사전 확인하세요.',
    checked: false,
  },
  {
    id: 'p9',
    category: '상비약 및 안전',
    text: '필수 비상약 (종합감기약, 해열진통제, 소화제, 지사제, 방수 밴드)',
    tip: '해외 현지 약국에서는 용량이나 성분이 체질에 맞지 않을 수 있으므로 평소 복용하던 익숙한 국내 상비약을 여유 있게 챙기는 것이 안전합니다.',
    checked: false,
  },
  {
    id: 'p10',
    category: '상비약 및 안전',
    text: '해외 여행자 보험 가입 (질병·상해 의료비 및 휴대품 손해 보상)',
    tip: '1~2만 원대의 합리적인 비용으로 스마트폰 파손이나 예상치 못한 현지 병원비 부담을 든든하게 대비할 수 있습니다.',
    checked: false,
  },
];

export const TravelPrepSection: React.FC = () => {
  const [items, setItems] = useState<PrepItem[]>(() => {
    try {
      const saved = localStorage.getItem('yeojeong_prep_items');
      return saved ? JSON.parse(saved) : DEFAULT_PREP_ITEMS;
    } catch {
      return DEFAULT_PREP_ITEMS;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('전체');
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PrepItem['category']>('의류 및 짐');

  useEffect(() => {
    try {
      localStorage.setItem('yeojeong_prep_items', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: PrepItem = {
      id: `custom-${Date.now()}`,
      category: newItemCategory,
      text: newItemText.trim(),
      tip: '여행자가 직접 추가한 개인 준비물',
      checked: false,
    };
    setItems([newItem, ...items]);
    setNewItemText('');
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    setItems(DEFAULT_PREP_ITEMS);
  };

  const checkedCount = items.filter((i) => i.checked).length;
  const progressPercent = Math.round((checkedCount / (items.length || 1)) * 100);

  const categories = ['전체', '필수 서류', '금융 및 통신', '카메라 및 사진', '의류 및 짐', '상비약 및 안전'];

  const filteredItems = items.filter((item) => {
    if (activeTab === '전체') return true;
    return item.category === activeTab;
  });

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
              <Luggage className="w-4 h-4" />
              <span>TRAVEL READINESS & ESSENTIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
              완벽한 여행을 위한 체크리스트 및 인생샷 준비 가이드
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              무엇부터 어떻게 준비해야 할지 고민되시나요? 여행 전문가들의 시기별 준비 일정과 
              실패 없는 포토존 인생샷 준비 요령을 차근차근 점검해 보세요.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>준비 완료 현황</span>
              <span className="font-mono text-amber-600 font-bold">
                {checkedCount} / {items.length} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* D-Day Timeline Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-amber-600">D-30 한 달 전</div>
            <h3 className="text-sm font-bold text-slate-900">항공권 · 숙소 · 여권 확인</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              여권 유효기간 6개월 이상 잔여 여부 확인, 인기 명소 및 교통권 사전 예약(루브르, 융프라우 산악열차 등).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-amber-600">D-14 2주 전</div>
            <h3 className="text-sm font-bold text-slate-900">환전 · 통신 · 보험 가입</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              트래블로그 카드 발급 및 현지 통화 충전, 현지 이심(eSIM) 구매, 해외 여행자 보험 필수 가입.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-amber-600">D-7 1주 전</div>
            <h3 className="text-sm font-bold text-slate-900">카메라 점검 및 의상 코디</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              배경과 어우러지는 포인트 의상 조합, 스마트폰 저장 공간 확보, 보조 배터리 및 미니 삼각대 작동 확인.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-amber-600">D-1 하루 전</div>
            <h3 className="text-sm font-bold text-slate-900">최종 점검 및 짐 꾸리기</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              항공편 모바일 체크인, 바우처 오프라인 캡처본 저장, 100ml 이하 기내 액체류 지퍼백 분리 포장.
            </p>
          </div>
        </div>

        {/* Checklist Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === cat
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={resetToDefault}
            className="text-xs text-slate-400 hover:text-slate-700 underline cursor-pointer"
          >
            기본 체크리스트로 초기화
          </button>
        </div>

        {/* Interactive Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                item.checked
                  ? 'bg-amber-50/40 border-amber-200 text-slate-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="mt-0.5 text-amber-600 shrink-0">
                {item.checked ? (
                  <CheckSquare className="w-5 h-5 text-amber-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm font-bold leading-snug ${
                      item.checked ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {item.text}
                  </span>
                  <span className="text-[11px] text-slate-400 shrink-0">{item.category}</span>
                </div>

                {item.tip && (
                  <p className="text-xs text-slate-500 leading-relaxed">{item.tip}</p>
                )}
              </div>

              {item.id.startsWith('custom-') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(item.id);
                  }}
                  className="text-slate-300 hover:text-rose-500 p-1 cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Custom Item Form */}
        <form onSubmit={handleAddItem} className="pt-2 flex flex-col sm:flex-row gap-2">
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="의류 및 짐">의류 및 짐</option>
            <option value="카메라 및 사진">카메라 및 사진</option>
            <option value="필수 서류">필수 서류</option>
            <option value="금융 및 통신">금융 및 통신</option>
            <option value="상비약 및 안전">상비약 및 안전</option>
          </select>

          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="나만의 여행 준비물을 직접 추가해 보세요 (예: 미니 스팀다리미, 방수팩, 손난로)"
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>준비물 추가</span>
          </button>
        </form>
      </div>
    </section>
  );
};
