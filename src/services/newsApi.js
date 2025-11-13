import { API_BASE, DEFAULT_PAGE_SIZE } from '../config/constants';
import { logger } from '../utils/logger';

function buildUrl(query){
  const params = new URLSearchParams({
    q: query,
    pageSize: DEFAULT_PAGE_SIZE.toString(),
    sortBy: 'publishedAt',
    language: process.env.REACT_APP_NEWS_API_LANG || 'pt'
  });
  return `${API_BASE}/everything?${params.toString()}`;
}

// Normaliza artigo para o formato usado pelo componente Card
function normalizeArticle(a){
  return {
    title: a.title,
    description: a.description,
    source: { name: a.source?.name },
    url: a.url,
    urlToImage: a.urlToImage,
    publishedAt: a.publishedAt
  };
}

export async function fetchNews(query, { signal } = {}) {
  if(!query) return [];
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  if(!apiKey){
    logger.warn('API key ausente. Configure REACT_APP_NEWS_API_KEY no seu .env. Retornando mock.');
    return [
      { title: 'Configure sua chave REACT_APP_NEWS_API_KEY', description: 'Sem chave real, exibindo dados mock.', source: { name: 'Local' }, url: 'https://example.com', urlToImage: '', publishedAt: new Date().toISOString() }
    ];
  }
  const url = buildUrl(query);
  const res = await fetch(url, { headers: { 'X-Api-Key': apiKey }, signal });
  if(!res.ok){
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text.slice(0,140)}`);
  }
  const data = await res.json();
  if(!data.articles) return [];
  return data.articles.map(normalizeArticle);
}
