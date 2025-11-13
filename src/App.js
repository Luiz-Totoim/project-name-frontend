import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Modal from './components/Modal';
import Button from './components/Button';
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

  const [openDemo, setOpenDemo] = React.useState(false);

  return (
    <div className="app">
      <Header />
      <main>
        <h1 className="app__title">NewsExplorer — Etapa 1</h1>
        <SearchBar onSearch={handleSearch} />
        <div style={{margin:'16px 0'}}>
          <Button variant="ghost" onClick={()=> setOpenDemo(true)}>Abrir Modal de Exemplo</Button>
        </div>
        <section className="results">
          {sample.map((a,i)=> <Card key={i} article={a} />)}
        </section>
      </main>
      <Modal open={openDemo} onClose={()=> setOpenDemo(false)} title="Demo UI Kit">
        <p style={{marginTop:0}}>Este modal demonstra foco inicial, trap de foco, fechamento por ESC, clique fora e botão fechar.</p>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Form enviado (demo).');}} noValidate>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <label>
              <span style={{display:'block',fontSize:12,fontWeight:500,marginBottom:4}}>Email</span>
              <input type="email" required placeholder="seu@email" style={{padding:'8px 10px',border:'1px solid #cbd5e1',borderRadius:6,width:'100%'}} />
            </label>
            <label>
              <span style={{display:'block',fontSize:12,fontWeight:500,marginBottom:4}}>Nome</span>
              <input type="text" minLength={2} required placeholder="Seu nome" style={{padding:'8px 10px',border:'1px solid #cbd5e1',borderRadius:6,width:'100%'}} />
            </label>
            <div style={{display:'flex',gap:'8px',justifyContent:'flex-end'}}>
              <Button variant="ghost" onClick={()=> setOpenDemo(false)}>Cancelar</Button>
              <Button type="submit">Enviar</Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
