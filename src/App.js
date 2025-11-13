import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Modal from './components/Modal';
import Button from './components/Button';
import Preloader from './components/Preloader';
import { fetchNews } from './services/newsApi';
import { VISIBLE_CHUNK } from './config/constants';
import './App.css';

export default function App() {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const abortRef = React.useRef();
  const [openDemo, setOpenDemo] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(VISIBLE_CHUNK);
  const visibleItems = React.useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount]);

  // Boas práticas: abortar requisição pendente ao desmontar o componente
  React.useEffect(() => {
    return () => {
      if (abortRef.current && typeof abortRef.current.abort === 'function') {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, []);

  async function handleSearch(q){
    if(!q) return; // validação já acontece em SearchBar
    setError('');
    setLoading(true);
    setArticles([]);
    setVisibleCount(VISIBLE_CHUNK);
    if(abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const data = await fetchNews(q, { signal: controller.signal });
      setArticles(data);
      if(data.length === 0) {
        setError('Nada encontrado');
      }
    } catch (err) {
      if(err.name !== 'AbortError') {
        console.error(err);
        setError(err.message || 'Erro ao buscar dados');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <a href="#conteudo" className="skiplink">Ir para conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <h1 className="app__title">NewsExplorer — Etapa 2</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="demo-actions">
          <Button variant="ghost" onClick={()=> setOpenDemo(true)}>Abrir Modal de Exemplo</Button>
        </div>
        {loading && <Preloader />}
        {error && !loading && <div className="results__status" role="alert">{error}</div>}
        <section className="results" aria-live="polite" aria-label="Resultados da busca">
          {!loading && !error && visibleItems.map((a,i)=> <Card key={i} article={a} />)}
        </section>
        {!loading && !error && articles.length > 0 && (
          <div className="results__count" aria-label="Total de resultados">{articles.length} resultado(s)</div>
        )}
        {!loading && !error && articles.length > visibleCount && (
          <div className="loadmore">
            <Button onClick={()=> setVisibleCount(c=> Math.min(c + VISIBLE_CHUNK, articles.length))}>
              Mostrar mais
            </Button>
          </div>
        )}
      </main>
      <footer className="app__footer" role="contentinfo">
        <small>&copy; {new Date().getFullYear()} NewsExplorer Demo</small>
      </footer>
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
