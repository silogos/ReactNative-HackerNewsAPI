import http from '../utils/http';

// development
export const API_URL = 'https://hacker-news.firebaseio.com/v0/';

// ------- https://github.com/HackerNews/API ----------------------

export const getTopStories = () => {
  return http.get(`${API_URL}/topstories.json`);
};

export const getKeys = (name) => {
  return http.get(`${API_URL}/${name}.json`);
};

export const getItem = id => {
  return http.get(`${API_URL}/item/${id}.json`);
};