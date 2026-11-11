import { TravelStory, StampItem } from '../types';

export const INITIAL_STORIES: TravelStory[] = [
  {
    id: 'jeju-ocean-2026',
    title: '에메랄드빛 바람과 유채꽃 절벽, 제주 동쪽 3박 4일 여정',
    destination: '제주 구좌 및 성산',
    region: '국내',
    theme: '오션뷰',
    author: {
      name: '민서의 렌즈',
      handle: '@minseo_travels',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      badge: '골든아워 헌터'
    },
    date: '2026.04',
    heroImage: '/src/assets/images/photospot_jeju_ocean_1794378957600.jpg',
    likes: 342,
    scraps: 189,
    views: 4210,
    tags: ['제주여행', '인생샷명소', '유채꽃절벽', '동쪽바다', '대중교통여행'],
    bestPhotoSpot: {
      title: '성산 해안 절벽 목재 벤치 포인트',
      location: '제주특별자치도 서귀포시 성산읍 해맞이해안로 인근 해안 산책로',
      goldenTime: '오후 4시 40분 ~ 5시 40분 (황금빛 일몰 직전)',
      cameraAngleTip: '수평선을 화면 하단 3분의 1 지점에 두고 목재 벤치를 사선 45도 각도로 배치해 보세요. 스마트폰 2배 인물 모드로 촬영하면 만개한 노란 유채꽃이 전경에 부드럽게 흐려지며 깊이 있는 사진이 연출됩니다.',
      poseTip: '벤치에 걸터앉아 바다 쪽으로 시선을 돌린 뒤, 바닷바람에 날리는 챙모자를 손끝으로 가볍게 잡는 자연스러운 실루엣을 연출해 보세요.',
      gearTip: '35mm 단초점 렌즈 또는 스마트폰 인물 사진 모드 (조리개 f/2.0 권장)',
      image: '/src/assets/images/photospot_jeju_ocean_1794378957600.jpg'
    },
    hiddenGems: [
      {
        name: '구좌읍 돌담길 숨은 팽나무 쉼터',
        category: '비밀 산책로',
        description: '관광객의 발길이 거의 닿지 않는 옛 제주식 올레길입니다. 300년 된 팽나무 그늘 아래에서 잔잔한 파도 소리를 들으며 휴식할 수 있습니다.',
        localTip: '오전 10시 무렵 방문하면 돌담 틈새로 부드러운 아침 햇살이 스며들어 감성적인 그림자가 드리워집니다.'
      },
      {
        name: '하도리 당근밭 뷰 로스터리 찻집',
        category: '감성 카페',
        description: '드넓은 구좌 당근밭과 푸른 지평선이 한눈에 펼쳐지는 고즈넉한 통창 목조 공간입니다.',
        localTip: '당일 수확한 신선한 당근 착즙 주스와 묵직한 풍미의 핸드드립 커피 조합을 추천합니다.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: '동쪽 해안선을 따라 달리는 성산 드라이브',
        stops: [
          { time: '11:00', place: '제주국제공항 도착 및 렌터카 인수', note: '구좌 해안도로 방면으로 여유롭게 출발' },
          { time: '13:00', place: '월정리 돌문어 덮밥 로컬 식당', note: '바다가 시원하게 내려다보이는 창가 좌석 추천' },
          { time: '16:40', place: '성산 절벽 유채꽃 벤치 포토존', note: '일몰 1시간 전에 도착하여 골든아워 빛으로 촬영', isPhotoSpot: true },
          { time: '19:00', place: '성산 흑돼지 참숯구이 식당', note: '현지 주민들이 즐겨 찾는 멜젓 전문점' }
        ]
      },
      {
        day: 2,
        title: '우도 도항선 탑승과 오션뷰 카페 탐방',
        stops: [
          { time: '09:30', place: '성산포항 종합여객터미널 출항', note: '바람이 잦은 날에는 승선 전 멀미약 복용 권장' },
          { time: '11:00', place: '검멀레 해변 동굴 보트 투어', note: '검은 모래 해변과 웅장한 주상절리 감상' },
          { time: '14:30', place: '서빈백사 산호해수욕장 팝콘 모래', note: '하얀 홍조단괴 해변과 에메랄드빛 바다 배경 촬영', isPhotoSpot: true },
          { time: '17:00', place: '종달리 독립 서점 골목 산책', note: '조용한 문학과 따뜻한 차 한 잔의 여유' }
        ]
      }
    ],
    travelNotes: '제주 동쪽 바다는 서쪽보다 한층 원초적인 바람과 거친 해안 절벽의 매력을 간직하고 있습니다. 특히 4월의 성산 절벽은 샛노란 유채꽃과 청록빛 바다가 선명한 대비를 이루어, 셔터를 누르는 모든 순간이 한 폭의 그림엽서가 되었습니다.',
    budgetSummary: '2인 기준 약 62만 원 (식비 24만 원, 렌터카 18만 원, 숙소 20만 원)',
    comments: [
      { id: 'c1', user: '여행자하늘', comment: '벤치 앵글 조언 덕분에 인생 사진을 건졌습니다! 정말 오후 4시 40분이 제격이네요.', date: '3일 전', stamp: '📸 인생샷 인정' },
      { id: 'c2', user: '바람결', comment: '구좌 당근밭 찻집을 메모해 두었습니다. 다음 주 여행 때 꼭 들러보겠습니다!', date: '1일 전', stamp: '💡 꿀팁 감사' }
    ]
  },
  {
    id: 'kyoto-bamboo-2026',
    title: '새벽 안개 머금은 대나무 숲길, 교토 2박 3일 힐링 여정',
    destination: '일본 교토 아라시야마',
    region: '일본/동아시아',
    theme: '숲&자연',
    author: {
      name: '준호의 필름로그',
      handle: '@junho_film',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      badge: '필름 아카이비스트'
    },
    date: '2026.03',
    heroImage: '/src/assets/images/photospot_kyoto_bamboo_1794378958324.jpg',
    likes: 512,
    scraps: 298,
    views: 6840,
    tags: ['교토여행', '아라시야마', '대나무숲', '새벽산책', '필름감성'],
    bestPhotoSpot: {
      title: '치쿠린 오솔길 이끼 석등 갈림길',
      location: '일본 교토부 우쿄구 사가오구라야마초 아라시야마 죽림 산책로',
      goldenTime: '오전 7시 15분 ~ 8시 (인파가 몰리기 전 첫 햇살 시간대)',
      cameraAngleTip: '돌계단 바닥 쪽으로 카메라를 무릎 높이까지 낮추는 낮은 앵글을 잡아보세요. 하늘로 곧게 뻗어 올라가는 대나무의 웅장한 높이감과 숲 틈새로 쏟아지는 아침 빛내림을 한 화면에 담아낼 수 있습니다.',
      poseTip: '오솔길 중앙을 천천히 걸어가며 뒷모습이나 고개를 살짝 돌리는 실루엣이 가장 신비로운 분위기를 자아냅니다.',
      gearTip: '28mm 또는 35mm 광각 단초점 렌즈, CPL 편광 필터 (대나무 잎 표면 반사광 억제)',
      image: '/src/assets/images/photospot_kyoto_bamboo_1794378958324.jpg'
    },
    hiddenGems: [
      {
        name: '오타기 넨부츠지 사찰 (1,200 나한상)',
        category: '비밀 사찰',
        description: '아라시야마 북쪽 끝자락에 자리하여 단체 관광객의 손길이 닿지 않는 곳입니다. 각기 다른 해학적인 표정을 지닌 1,200개의 이끼 낀 돌불상이 숲에 안겨 있습니다.',
        localTip: '아라시야마역 앞에서 자전거를 대여해 완만한 오르막길을 오르면 약 20분 만에 도착할 수 있습니다.'
      },
      {
        name: '가모강변 다다미 앤틱 찻집',
        category: '로컬 찻집',
        description: '백 년이 넘은 목조 가옥 2층에서 말차와 화과자를 즐기며 잔잔한 강물에 비치는 저녁노을을 감상할 수 있는 공간입니다.',
        localTip: '오후 5시 무렵 창가 좌석에 앉아 강변의 왜가리와 노을 풍경을 함께 담아보세요.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: '아라시야마의 고요한 새벽 산책과 도게츠교 풍경',
        stops: [
          { time: '07:00', place: '아라시야마 치쿠린 도착', note: '관광객이 없는 고요한 대나무 숲길 산책 및 촬영', isPhotoSpot: true },
          { time: '09:00', place: '노노미야 신사 및 덴류지 정원', note: '정갈한 이끼 정원과 연못 산책' },
          { time: '12:00', place: '도게츠교 강변 메밀소바 노포', note: '담백한 유바(두부 껍질) 튀김 소바 맛보기' },
          { time: '15:00', place: '오타기 넨부츠지 나한상 사찰', note: '나를 닮은 표정의 돌불상 찾아보기' }
        ]
      },
      {
        day: 2,
        title: '기온 거리의 붉은 목조 가옥과 철학의 길',
        stops: [
          { time: '10:00', place: '은각사(긴카쿠지) 모래 정원', note: '단아한 선(Zen)의 미학 체험' },
          { time: '13:00', place: '철학의 길 수로변 킷사텐', note: '빈티지 사이폰 추출 커피 한 잔' },
          { time: '17:30', place: '기온 하나미코지 등불 거리', note: '가스등이 하나둘 켜지는 황혼 무렵의 골목 정취', isPhotoSpot: true }
        ]
      }
    ],
    travelNotes: '교토의 진정한 멋은 아침 7시에 있습니다. 인파가 밀려들기 전 바람에 사각거리는 대나무 잎 소리와 차가운 새벽 공기 속에서 비로소 이 유서 깊은 도시의 천 년 세월을 온몸으로 느낄 수 있었습니다.',
    budgetSummary: '1인 기준 약 75만 원 (간사이 패스, 전통 료칸 1박 및 비즈니스 호텔 1박 포함)',
    comments: [
      { id: 'c3', user: '솔로트래블러', comment: '아침 7시 15분 메모 완료! 꿀팁 덕분에 새벽 기상을 결심했습니다.', date: '5일 전', stamp: '✈️ 이번 주말 각' }
    ]
  },
  {
    id: 'swiss-alps-2026',
    title: '알프스의 숨결과 야생화 언덕, 그린델발트 인생 하이킹',
    destination: '스위스 융프라우 및 그린델발트',
    region: '유럽',
    theme: '골든아워',
    author: {
      name: '엘레나 (Elena)',
      handle: '@elena_alpine',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      badge: '알프스 트레커'
    },
    date: '2026.06',
    heroImage: '/src/assets/images/photospot_swiss_alps_1794378958360.jpg',
    likes: 890,
    scraps: 450,
    views: 11200,
    tags: ['스위스', '그린델발트', '융프라우', '야생화하이킹', '유럽여행'],
    bestPhotoSpot: {
      title: '피르스트 바흐알프제 호수 및 샬레 통나무길',
      location: '스위스 베른주 그린델발트 피르스트(First) 해발 2,168m 트레킹 코스',
      goldenTime: '오전 10시 ~ 11시 30분 (설산과 야생화가 가장 선명한 정오 전 자연광)',
      cameraAngleTip: '하이킹 트레일의 오솔길이 화면 대각선으로 시원하게 뻗어나가도록 구도를 설정하세요. 전경에 형형색색의 야생화 군락을 30%가량 채워 넣으면 아이거 북벽 설산과의 웅장한 원근감이 극대화됩니다.',
      poseTip: '배낭을 메고 오솔길을 따라 올라가는 자연스러운 뒷모습을 와이드 샷으로 담아내면 자연의 경이로움이 돋보입니다.',
      gearTip: '초광각 16-35mm 줌렌즈, 편광(CPL) 필터 필수 장착 권장',
      image: '/src/assets/images/photospot_swiss_alps_1794378958360.jpg'
    },
    hiddenGems: [
      {
        name: '뮈렌(Mürren) 마을 무인 치즈 오두막',
        category: '로컬 체험',
        description: '절벽 위 내연기관 차 없는 청정 마을 뮈렌의 트레일 옆에 자리한 목조 오두막입니다. 지역 농부들이 갓 빚은 알프스 치즈를 자율 양심 계산대로 구입할 수 있습니다.',
        localTip: '스위스 프랑 동전을 미리 준비해 가세요. 갓 구운 바게트와 곁들여 벤치에서 먹으면 최고의 점심이 됩니다.'
      },
      {
        name: '라우터브루넨 슈타우프바흐 폭포 뒷길 동굴',
        category: '비밀 전망대',
        description: '수직 절벽에서 세차게 쏟아지는 300m 폭포수 바로 뒤편의 바위 동굴 통로입니다. 자욱한 물보라 사이로 무지개와 계곡 마을 풍경이 파노라마처럼 펼쳐집니다.',
        localTip: '방수 기능이 있는 외투를 챙기시고, 미끄럼 방지 등산화를 반드시 착용하시기 바랍니다.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: '피르스트 곤돌라 탑승과 알프스 플라워 트레킹',
        stops: [
          { time: '08:30', place: '그린델발트역 출발', note: '피르스트 케이블카 탑승' },
          { time: '09:30', place: '클리프 워크(Cliff Walk) 전망대', note: '허공에 매달린 투명 유리 전망 데크 체험' },
          { time: '10:30', place: '바흐알프제 호수 하이킹 코스', note: '만개한 야생화와 만년설 반영 사진 촬영', isPhotoSpot: true },
          { time: '14:00', place: '피르스트 마운틴 카트 다운힐', note: '푸른 초원을 가르는 신나는 액티비티' }
        ]
      },
      {
        day: 2,
        title: '라우터브루넨 72개 폭포 계곡과 뮈렌 산책',
        stops: [
          { time: '10:00', place: '라우터브루넨 빙하 U자곡 계곡', note: '거대한 빙하 침식 절벽 감상' },
          { time: '13:00', place: '슈타우프바흐 폭포 뒷길 동굴', note: '물안개 속 신비로운 무지개 조망', isPhotoSpot: true },
          { time: '15:30', place: '뮈렌 샬레 마을 치즈 시식', note: '아이거, 묀히, 융프라우 3대 영봉 파노라마 감상' }
        ]
      }
    ],
    travelNotes: '알프스에는 사진 한 장에 온전히 담을 수 없는 공기의 청명함과 딸랑이는 소들의 워낭 소리가 있습니다. 야생화가 흐드러지게 핀 초원을 걷다 보면 일상에서 묵혀두었던 답답함이 깨끗이 씻겨 내려갑니다.',
    budgetSummary: '1인 기준 약 190만 원 (스위스 트래블 패스, 샬레 에어비앤비 3박)',
    comments: [
      { id: 'c4', user: '마운틴러버', comment: '피르스트에서 야생화 전경 걸치기 촬영 팁이 정말 유용했습니다. 가이드북보다 훨씬 생생하네요!', date: '1주일 전', stamp: '📸 인생샷 인정' }
    ]
  },
  {
    id: 'paris-cafe-2026',
    title: '따스한 햇살 드는 노천카페와 크루아상, 파리 골목 산책기',
    destination: '프랑스 파리 몽마르트르 및 마레 지구',
    region: '유럽',
    theme: '카페&골목',
    author: {
      name: '루이 & 소피',
      handle: '@louis_sophie',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
      badge: '로맨틱 듀오'
    },
    date: '2026.05',
    heroImage: '/src/assets/images/photospot_paris_cafe_1794378959524.jpg',
    likes: 670,
    scraps: 340,
    views: 8900,
    tags: ['파리여행', '몽마르트르', '노천카페', '마레지구', '프랑스감성'],
    bestPhotoSpot: {
      title: '몽마르트르 골목 테라스 카페 및 사크레쾨르 원경 앵글',
      location: '프랑스 파리 18구 몽마르트르 아브뢰부아르 거리 인근',
      goldenTime: '오후 3시 30분 ~ 5시 (고풍스러운 건물 외벽에 온화한 사광선이 비치는 시간)',
      cameraAngleTip: '원형 대리석 테이블 위 따뜻한 카페라테와 갓 구운 크루아상을 화면 앞쪽에 자연스럽게 걸치고(프레임 인 프레임 기법), 뒤편의 짙은 남색 카페 파사드와 자갈길을 얕은 심도로 부드럽게 담아내세요.',
      poseTip: '마주 앉아 가볍게 커피잔을 쥐고 다정하게 미소 짓는 자연스러운 캔디드(Candid) 스냅 샷이 한 편의 프랑스 영화처럼 연출됩니다.',
      gearTip: '50mm 표준 단초점 렌즈 (조리개 f/1.8 ~ f/2.2 설정 권장)',
      image: '/src/assets/images/photospot_paris_cafe_1794378959524.jpg'
    },
    hiddenGems: [
      {
        name: '생마르탱 운하 비밀 수변 북카페',
        category: '문화 공간',
        description: '인파로 북적이는 센강 대신 현지 파리지앵들이 바게트와 와인을 들고 나와 독서를 즐기는 조용한 운하변 서점 겸 카페입니다.',
        localTip: '철제 다리 위에서 운하 갑문이 열리고 수위가 차오르는 순간을 기다려 보세요. 영화의 한 장면 같은 순간을 마주할 수 있습니다.'
      },
      {
        name: '보주 광장 아케이드 바이올린 버스킹 명당',
        category: '감성 명소',
        description: '붉은 벽돌 회랑 아래에서 클래식 바이올리니스트가 천연 건축 음향을 이용해 연주를 선보이는 비밀스러운 음악 공간입니다.',
        localTip: '해 질 무렵 회랑 아래 벤치에 기대어 음악을 감상하면 파리 여행의 낭만이 완성됩니다.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: '예술가들의 언덕 몽마르트르와 골목 산책',
        stops: [
          { time: '10:00', place: '사랑해 벽 (Le Mur des Je t’aime)', note: '전 세계 수많은 언어로 적힌 사랑의 고백 감상' },
          { time: '12:30', place: '몽마르트르 테라스 카페 브런치', note: '바삭한 크루아상과 진한 에스프레소 한 잔', isPhotoSpot: true },
          { time: '15:30', place: '라 메종 로즈 분홍빛 카페 골목', note: '고풍스러운 자갈길과 빈티지 가로등 인생 사진 촬영' },
          { time: '19:00', place: '사크레쾨르 대성당 계단 일몰 감상', note: '파리 시가지가 황금빛으로 물드는 파노라마 전망' }
        ]
      },
      {
        day: 2,
        title: '마레 지구 개성 있는 편집숍과 보주 광장의 오후',
        stops: [
          { time: '11:00', place: '마레 지구 빈티지 부티크 투어', note: '파리 특유의 감각적인 패션 소품 탐색' },
          { time: '14:00', place: '생마르탱 운하 수변 산책 및 북카페', note: '여유로운 독서와 휴식' },
          { time: '17:00', place: '보주 광장 분수대 잔디밭 피크닉', note: '달콤한 마카롱과 시원한 로제 와인 즐기기' }
        ]
      }
    ],
    travelNotes: '파리의 진정한 매력은 유명 박물관 앞에 길게 줄을 서는 데 있지 않고, 따스한 햇살이 드는 골목 카페 테라스에 앉아 오가는 사람들의 모습과 햇살을 가만히 바라보는 시간 속에 있었습니다.',
    budgetSummary: '2인 기준 약 220만 원 (항공권 제외, 부티크 호텔 3박 및 미식 카페 투어)',
    comments: [
      { id: 'c5', user: '파리지앵꿈나무', comment: '라 메종 로즈 골목과 마레 지구 동선 그대로 따라가 볼 계획입니다. 사진 분위기가 정말 황홀하네요!', date: '2일 전', stamp: '🗺️ 지도 저장' }
    ]
  },
  {
    id: 'gangneung-cliff-2026',
    title: '동해의 푸른 파도와 해안 단구 절벽, 강릉·정동진 바다 로드',
    destination: '강원도 강릉 및 정동진',
    region: '국내',
    theme: '오션뷰',
    author: {
      name: '동해바람',
      handle: '@east_breeze',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      badge: '로컬 서퍼'
    },
    date: '2026.04',
    heroImage: '/src/assets/images/hero_travel_scenic_1794378956160.jpg',
    likes: 410,
    scraps: 215,
    views: 5300,
    tags: ['강릉여행', '정동심곡바다부채길', '동해바다', '드라이브코스', '일출명소'],
    bestPhotoSpot: {
      title: '정동심곡 바다부채길 몽돌 해변 전망 테라스',
      location: '강원특별자치도 강릉시 강동면 심곡리 114-3 바다부채길 해안 탐방로',
      goldenTime: '오전 6시 20분 ~ 7시 30분 (수평선 너머 붉은 여명과 청명한 아침 파도)',
      cameraAngleTip: '기암괴석의 해안 절벽 곡선을 화면 좌측에 두고, 우측으로 끝없이 펼쳐지는 수평선을 시원하게 배치해 보세요. 1000분의 1초 이상의 빠른 셔터 속도로 갯바위에 부서지는 하얀 파도 포말을 선명하게 포착하는 것이 핵심입니다.',
      poseTip: '상쾌한 바닷바람을 맞으며 데크 난간에 가볍게 기대어 먼 바다를 지그시 응시하는 자연스러운 상반신 구도를 추천합니다.',
      gearTip: '광각 24mm 단초점 렌즈 또는 스마트폰 초광각 모드',
      image: '/src/assets/images/hero_travel_scenic_1794378956160.jpg'
    },
    hiddenGems: [
      {
        name: '초당 솔숲 뒤편 빈티지 핸드드립 바',
        category: '감성 카페',
        description: '초당 순두부 마을에서 도보로 5분 거리인 울창한 솔숲 안쪽에 숨겨진 아늑한 LP 음악 카페입니다.',
        localTip: '시그니처 바닐라빈 라테와 은은한 꽃향기의 에티오피아 예가체프 핸드드립 커피를 추천합니다.'
      },
      {
        name: '사천진 바위섬 비밀 구름다리',
        category: '일몰 뷰포인트',
        description: '백사장과 자연스럽게 이어진 작은 갯바위 다리로, 바닷물이 발치까지 찰랑이는 신비로운 사진을 남길 수 있습니다.',
        localTip: '만조 시간을 피해 썰물 1시간 전후에 방문하시면 안전하면서도 환상적인 반영 사진을 담을 수 있습니다.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: '바다부채길과 솔향 가득한 강릉 힐링 코스',
        stops: [
          { time: '06:30', place: '정동진 일출 감상', note: '수평선 위로 장엄하게 솟아오르는 붉은 태양 마주하기' },
          { time: '08:00', place: '정동심곡 바다부채길 트레킹', note: '2,300만 년 전 지각변동이 빚어낸 해안 단구 절벽 포토존', isPhotoSpot: true },
          { time: '12:00', place: '초당 순두부 짬뽕 로컬 식당', note: '얼큰하면서도 부드러운 순두부 국물로 든든한 점심 식사' },
          { time: '15:30', place: '안목해변 솔숲 산책로', note: '솔향을 맡으며 즐기는 테이크아웃 커피 한 잔' }
        ]
      }
    ],
    travelNotes: '서울에서 KTX로 약 2시간이면 닿을 수 있는 가장 시원하고 푸른 탈출구입니다. 바다부채길을 걸으며 부서지는 파도 소리를 온 귀로 듣다 보면 일상에서 얽혀 있던 복잡한 생각들이 말끔하게 정돈됩니다.',
    budgetSummary: '1인 기준 약 28만 원 (KTX 왕복, 바다 전망 숙소 1박, 식음료)',
    comments: [
      { id: 'c6', user: '바다바라기', comment: '바다부채길 아침 셔터 속도 꿀팁이 정말 실용적이네요! 이번 주말 드라이브 코스로 바로 결정했습니다.', date: '4일 전', stamp: '📸 인생샷 인정' }
    ]
  }
];

export const INITIAL_STAMPS: StampItem[] = [
  {
    id: 'stamp-jeju',
    region: '국내',
    name: '제주 에메랄드 탐험가',
    code: 'CJU-77',
    description: '제주의 푸른 바다와 유채꽃 절벽 포토존을 탐색하고 영감을 얻었습니다.',
    isUnlocked: true,
    unlockedAt: '2026.04.12'
  },
  {
    id: 'stamp-kyoto',
    region: '일본',
    name: '교토 새벽 사색가',
    code: 'UKY-01',
    description: '아라시야마 죽림의 맑은 아침 햇살과 고요한 사찰을 마주했습니다.',
    isUnlocked: true,
    unlockedAt: '2026.04.14'
  },
  {
    id: 'stamp-swiss',
    region: '스위스',
    name: '알프스 야생화 트레커',
    code: 'GRD-88',
    description: '그린델발트와 피르스트의 웅장한 설산 파노라마를 스크랩했습니다.',
    isUnlocked: false
  },
  {
    id: 'stamp-paris',
    region: '프랑스',
    name: '파리지앵 낭만 수집가',
    code: 'CDG-18',
    description: '몽마르트르 골목 노천카페와 사크레쾨르 원경을 가슴에 담았습니다.',
    isUnlocked: false
  },
  {
    id: 'stamp-photographer',
    region: '스페셜',
    name: '골든아워 마스터 뱃지',
    code: 'GOLD-24',
    description: '포토존 가이드와 카메라 앵글 꿀팁을 3회 이상 북마크했습니다.',
    isUnlocked: true,
    unlockedAt: '2026.04.15'
  },
  {
    id: 'stamp-creator',
    region: '스페셜',
    name: '첫 여정 작가 뱃지',
    code: 'WRT-01',
    description: '나만의 소중한 첫 번째 여행기를 커뮤니티에 공유했습니다.',
    isUnlocked: false
  }
];
