import axios from 'axios';

export async function openAi(review: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  console.log(apiKey);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const role = `
        당신은 리뷰 검증 전문가입니다.
        사용자들이 간단한 리뷰를 남길수도있지만 광고성 리뷰는 제외해야합니다.
        너무 깐깐하게 보지는 말아주세요.
        장소에대한 리뷰는 장소에대한 리뷰만 써주세요.
        장소에대해 기분을 쓰는 리뷰도 좋아요.
        공격적인 리뷰는 제외해주세요.
        비판적인 리뷰는 좋아요.
        부정적인 리뷰는 근거가있는 경우만 좋아요.
        다음 리뷰가 적절한지 검토하고 true 또는 false로만 답변해주세요.
        지침:
            1. 욕설이나 비속어가 포함된 경우 false
            2. 광고성 내용이 포함된 경우 false
            3. 장소와 관련없는 내용인 경우 false
            4. 위 조건을 모두 통과하면 true
    `;

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: role },
      { role: 'user', content: '리뷰정보:\n' + review },
    ],
  };

  try {
    const res = await axios.post(endpoint, data, { headers });
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('리뷰 검증 중 오류가 발생했습니다.');
  }
}
