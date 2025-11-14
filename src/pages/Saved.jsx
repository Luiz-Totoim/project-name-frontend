import React from 'react';
import Card from '../components/Card';

export default function Saved(){
  const saved = [];
  return (
    <section>
      <h2>Itens Salvos</h2>
      {saved.length === 0 ? <p>Nenhum item salvo</p> : saved.map(a=> <Card key={a.url} article={a} />)}
    </section>
  )
}
