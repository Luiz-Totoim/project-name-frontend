import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getArticles, deleteArticle } from '../services/backendApi';
import Card from '../components/Card';
import Preloader from '../components/Preloader';

export default function Saved() {
  const { token, currentUser } = useAuth();
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!token || !currentUser) return;

    setLoading(true);
    getArticles(token)
      .then((data) => setArticles(data))
      .catch((err) => setError(err.message || 'Erro ao carregar artigos'))
      .finally(() => setLoading(false));
  }, [token, currentUser]);

  async function handleDelete(articleId) {
    try {
      await deleteArticle(token, articleId);
      setArticles((prev) => prev.filter((a) => a._id !== articleId));
    } catch (err) {
      alert(err.message || 'Erro ao deletar artigo');
    }
  }

  if (!currentUser) {
    return (
      <section style={{ textAlign: 'center', padding: '40px 0' }}>
        <h2>Faça login para ver seus artigos salvos</h2>
      </section>
    );
  }

  return (
    <section>
      <h2 className="app__title">Itens Salvos</h2>
      {loading && <Preloader />}
      {error && !loading && <div className="results__status">{error}</div>}
      {!loading && !error && articles.length === 0 && <p>Nenhum item salvo</p>}
      {!loading && !error && articles.length > 0 && (
        <div className="results">
          {articles.map((a) => (
            <Card key={a._id} article={a} saved onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
