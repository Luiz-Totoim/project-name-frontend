import React from 'react';
import './Preloader.css';

export default function Preloader(){
  return (
    <div className="preloader" role="status" aria-live="polite" aria-label="Carregando resultados">
      <div className="preloader__spinner" />
      <span className="preloader__text">Carregando...</span>
    </div>
  );
}
