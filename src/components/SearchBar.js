import React from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = React.useState('');

  function submit(e) {
    e.preventDefault();
    if (onSearch) onSearch(q.trim());
  }

  return (
    <form className="searchbar" onSubmit={submit} role="search">
      <label className="searchbar__label" htmlFor="search-input">Pesquisar</label>
      <div className="searchbar__inner">
        <input
          id="search-input"
          className="searchbar__input"
          placeholder="Inserir tema"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button className="searchbar__btn" type="submit">Procurar</button>
      </div>
    </form>
  );
}
