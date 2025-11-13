import React from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = React.useState('');
  const [error, setError] = React.useState('');

  function validate(value){
    if(!value.trim()) return 'Digite um termo para pesquisar.';
    if(value.trim().length < 2) return 'Use pelo menos 2 caracteres.';
    return '';
  }

  function submit(e) {
    e.preventDefault();
    const vError = validate(q);
    setError(vError);
    if (!vError && onSearch) onSearch(q.trim());
  }

  return (
    <form className="searchbar" onSubmit={submit} role="search" noValidate>
      <label className="searchbar__label" htmlFor="search-input">Pesquisar</label>
      <div className="searchbar__inner">
        <input
          id="search-input"
          className={`searchbar__input ${error ? 'searchbar__input--error' : ''}`.trim()}
          placeholder="Inserir tema"
          value={q}
          onChange={e => { setQ(e.target.value); if(error) setError(validate(e.target.value)); }}
          aria-invalid={!!error}
          aria-describedby={error ? 'search-error' : undefined}
          data-autofocus
        />
        <button className="searchbar__btn" type="submit">Procurar</button>
      </div>
      <div id="search-error" className="searchbar__error" aria-live="polite">{error}</div>
    </form>
  );
}
