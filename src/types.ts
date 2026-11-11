export type Region = '전체' | '국내' | '일본/동아시아' | '유럽' | '동남아' | '미주/기타';

export type SpotTheme = '전체' | '골든아워' | '오션뷰' | '숲&자연' | '카페&골목';

export interface PhotoSpot {
  title: string;
  location: string;
  goldenTime: string;
  cameraAngleTip: string;
  poseTip: string;
  gearTip?: string;
  image: string;
}

export interface HiddenGem {
  name: string;
  category: string;
  description: string;
  localTip: string;
}

export interface ItineraryStop {
  time: string;
  place: string;
  note: string;
  isPhotoSpot?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  stops: ItineraryStop[];
}

export interface StoryComment {
  id: string;
  user: string;
  comment: string;
  date: string;
  stamp?: string;
}

export interface TravelStory {
  id: string;
  title: string;
  destination: string;
  region: Region;
  theme: SpotTheme;
  author: {
    name: string;
    handle: string;
    avatar: string;
    badge: string;
  };
  date: string;
  heroImage: string;
  likes: number;
  scraps: number;
  views: number;
  tags: string[];
  bestPhotoSpot: PhotoSpot;
  hiddenGems: HiddenGem[];
  itinerary: ItineraryDay[];
  travelNotes: string;
  budgetSummary?: string;
  comments: StoryComment[];
  isUserCreated?: boolean;
}

export interface StampItem {
  id: string;
  region: string;
  name: string;
  code: string;
  description: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface AiPhotoSpotResult {
  destination: string;
  catchphrase: string;
  photoSpots: {
    name: string;
    bestTime: string;
    cameraAngleTip: string;
    poseRecommendation: string;
    specialNote: string;
  }[];
  hiddenGem: {
    name: string;
    category: string;
    description: string;
    insiderTip: string;
  };
  recommendedRoute: string[];
}
