import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button';
import './Card.css';

export default function Card({ article, saved = false, onSave, onDelete }) {
  const { currentUser } = useAuth();
  if (!article) return null;
  const { title, description, source, url, urlToImage, publishedAt, text } = article;

  const displayDescription = description || text;
  const displaySource = source?.name || source;
  const displayUrl = url || article.link;
  const displayImage = urlToImage || article.image;
  const displayDate = publishedAt || article.date;

  return (
    <article className="card">
      {displayImage && (
        <img className="card__image" src={displayImage} alt={title} loading="lazy" decoding="async" />
      )}
      <div className="card__body">
        <h3 className="card__title">
          <a href={displayUrl} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <p className="card__desc">{displayDescription}</p>
        <div className="card__meta">
          {displaySource} • {new Date(displayDate).toLocaleDateString()}
        </div>
        {currentUser && (
          <div className="card__actions">
            {saved ? (
              <Button variant="danger" onClick={() => onDelete(article._id)}>
                Remover
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => onSave(article)}>
                Salvar
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
