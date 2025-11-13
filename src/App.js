import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import './App.css';

export default function App() {
  const sample = [
    {
      title: 'Exemplo de notícia 1',
      description: 'Resumo curto da notícia 1',
      source: { name: 'Fonte 1' },
      url: 'https://example.com/1',
      urlToImage: '',
      publishedAt: new Date().toISOString()
    }
  ];

  function handleSearch(q){
    // placeholder: será implementado na Etapa 2 (API)
    console.log('Pesquisar:', q);
  }

  return (
    <div className="app">
      <Header />
      <main>
        <h1 className="app__title">NewsExplorer — Etapa 1</h1>
        <SearchBar onSearch={handleSearch} />
        <section className="results">
          {sample.map((a,i)=> <Card key={i} article={a} />)}
        </section>
      </main>
    </div>
  );
}
