import React from 'react';
import './Card.css';

export default function Card({article}){
  if(!article) return null;
  const {title, description, source, url, urlToImage, publishedAt} = article;
  return (
    <article className="card">
      {urlToImage && (
        <img
          className="card__image"
          src={urlToImage}
          alt={title}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="card__body">
        <h3 className="card__title"><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></h3>
        <p className="card__desc">{description}</p>
        <div className="card__meta">{source?.name} • {new Date(publishedAt).toLocaleDateString()}</div>
      </div>
    </article>
  )
}
