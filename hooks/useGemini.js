import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyCTzrGfiezrhEZPI1L8tldJXuKWU466Lrw';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const useGemini = async ({ gptQuery }) => {
  try {
    const result = await model.generateContent(gptQuery);
    const response = await result.response;
    const text = response.text();

    return text.split(',').join('\n').replace('*', '');
  } catch (error) {
    console.error('Error generating gemini response:', error);
    return 'Error generating gemini response';
  }
};

export default useGemini;
