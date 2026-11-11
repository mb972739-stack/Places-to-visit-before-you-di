import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

// AI Photo Spot & Travel Guide Route
app.post('/api/ai-photospot', async (req, res) => {
  try {
    const { destination, travelTheme } = req.body;
    if (!destination || typeof destination !== 'string') {
      return res.status(400).json({ error: '여행지 이름을 입력해주세요.' });
    }

    if (aiClient) {
      try {
        const prompt = `당신은 전 세계의 숨은 명소와 인생샷 구도를 꿰뚫고 있는 전문 여행 사진작가이자 감성 로컬 가이드입니다.
사용자가 요청한 여행지: "${destination}" (여행 테마/스타일: "${travelTheme || '감성 인생샷 & 여유로운 힐링'}")

다음 JSON 구조에 맞추어 한국어로 답변해주세요. 유효한 JSON 문자열만 출력해야 합니다 (마크다운 코드블록 없이 순수 JSON만 반환):
{
  "destination": "${destination}",
  "catchphrase": "이 여행지를 한 문장으로 표현하는 감성적인 카피",
  "photoSpots": [
    {
      "name": "포토존 명소 이름",
      "bestTime": "추천 촬영 시간 (예: 오전 09:00~10:30 또는 일몰 30분 전 골든아워)",
      "cameraAngleTip": "전문적인 촬영 구도 및 카메라 앵글 팁 (예: 로우 앵글, 2배 줌, 수평선 맞춤)",
      "poseRecommendation": "인물이 취하면 좋은 자연스러운 포즈 팁",
      "specialNote": "놓치기 쉬운 주변 디테일이나 소품 팁"
    },
    {
      "name": "두 번째 포토존 명소 이름",
      "bestTime": "추천 촬영 시간",
      "cameraAngleTip": "촬영 구도 및 앵글 팁",
      "poseRecommendation": "포즈 팁",
      "specialNote": "주의사항 또는 꿀팁"
    }
  ],
  "hiddenGem": {
    "name": "관광객들은 잘 모르는 로컬 숨은 스팟 이름",
    "category": "카페 / 골목 / 전망대 / 로컬식당 중 하나",
    "description": "이 장소가 특별한 이유와 현지 분위기",
    "insiderTip": "현지인들만 아는 이용 팁이나 비밀 시간대"
  },
  "recommendedRoute": [
    "오전: 첫 번째 코스",
    "점심: 로컬 맛집 & 휴식",
    "오후: 포토존 힐링 산책",
    "일몰: 골든아워 인생샷 스팟"
  ]
}`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text || '';
        try {
          const parsed = JSON.parse(rawText);
          return res.json(parsed);
        } catch {
          // Fallback if parsing fails
          const cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanText);
          return res.json(parsed);
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, using intelligent fallback:', geminiError);
      }
    }

    // High quality intelligent fallback if no API key or network error
    const mockData = {
      destination,
      catchphrase: `${destination}에서만 만날 수 있는 빛과 바람의 순간`,
      photoSpots: [
        {
          name: `${destination} 시그니처 뷰포인트`,
          bestTime: "오후 16:30 ~ 17:40 (황금빛 골든아워)",
          cameraAngleTip: "35mm 단렌즈 또는 스마트폰 1.5배 줌으로 배경 왜곡 없이 인물과 자연의 실루엣을 강조하세요.",
          poseRecommendation: "카메라를 직접 응시하기보다 바람을 맞으며 먼 지평선을 바라보는 옆모습이 가장 드라마틱합니다.",
          specialNote: "삼각대 사용 시 바람에 흔들리지 않도록 가방으로 하단을 고정해 주세요."
        },
        {
          name: `${destination} 숨겨진 감성 골목길`,
          bestTime: "오전 09:30 ~ 11:00 (부드러운 사광선)",
          cameraAngleTip: "골목의 소실점을 인물 바로 뒤에 배치해 깊이감을 극대화하고 낮은 앵글로 촬영해 보세요.",
          poseRecommendation: "천천히 걸어오는 순간을 연사(Burst)로 담아 자연스러운 발걸음과 옷자락을 연출하세요.",
          specialNote: "오래된 벽면과 어우러지는 파스텔톤이나 린넨 소재 의상을 추천합니다."
        }
      ],
      hiddenGem: {
        name: `${destination} 언덕 위 비밀 라운지`,
        category: "전망대 & 로컬 쉼터",
        description: "대형 관광버스 진입이 어려워 조용하게 마을 전경과 일몰을 온전히 즐길 수 있는 비밀 공간입니다.",
        insiderTip: "해 질 녘 도착해 따뜻한 차 한 잔과 함께 노을을 감상하면 최고의 힐링을 누릴 수 있습니다."
      },
      recommendedRoute: [
        `오전: 상쾌한 공기와 함께하는 ${destination} 산책길`,
        `점심: 현지 제철 재료로 만든 로컬 정식`,
        `오후: 감성 카페 & 숨은 골목길 포토 스팟`,
        `일몰: 노을이 물드는 골든아워 뷰포인트에서 인생샷 남기기`
      ]
    };

    return res.json(mockData);
  } catch (error) {
    console.error('AI Photo Spot generation error:', error);
    return res.status(500).json({ error: '추천 정보를 불러오는 중 오류가 발생했습니다.' });
  }
});

// Mount Vite middleware in development
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
