import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">NewsExplorer</div>
      <nav className="header__nav">
        <Link to="/">Início</Link>
        <Link to="/saved">Itens salvos</Link>
      </nav>
    </header>
  );
}
