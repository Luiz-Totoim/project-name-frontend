import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button';
import './Header.css';

export default function Header({ onLoginClick }) {
  const { currentUser, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__brand">NewsExplorer</div>
      <nav className="header__nav">
        <Link to="/">Início</Link>
        {currentUser && <Link to="/saved">Itens salvos</Link>}
        {currentUser ? (
          <div className="header__user">
            <span className="header__username">{currentUser.name || currentUser.email}</span>
            <Button variant="ghost" onClick={logout}>
              Sair
            </Button>
          </div>
        ) : (
          <Button onClick={onLoginClick}>Entrar</Button>
        )}
      </nav>
    </header>
  );
}
