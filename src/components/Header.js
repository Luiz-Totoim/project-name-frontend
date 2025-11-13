import React from 'react';
import './Header.css';

export default function Header(){
  return (
    <header className="header">
      <div className="header__brand">NewsExplorer</div>
      <nav className="header__nav">
        <a href="/">Início</a>
        <a href="/saved">Itens salvos</a>
      </nav>
    </header>
  );
}
