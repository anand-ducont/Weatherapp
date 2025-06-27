import axios from 'axios';
const NEWS_API_KEY = 'NEWS_API_KEY';

export const fetchNews = async () => {
  try {
    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );
    return data.articles;
  } catch (error) {
    throw new Error('Failed to fetch news');
  }
};
