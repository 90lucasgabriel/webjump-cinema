import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const apiKey = '&api_key=dd656e8f52997de093bf8523eda0de95';
const language = '&language=pt-BR';
const region = '&region=BR';

const defaultConfig = `${apiKey}${language}${region}`;

export { api, apiKey, language, region, defaultConfig };
