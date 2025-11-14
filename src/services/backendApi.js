const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}

export function signup(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
}

export function signin(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getCurrentUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function getArticles(token) {
  return fetch(`${BASE_URL}/articles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function createArticle(token, article) {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then(checkResponse);
}

export function deleteArticle(token, articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
