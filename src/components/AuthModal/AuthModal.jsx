import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { useAuth } from '../../contexts/AuthContext';
import { signup, signin } from '../../services/backendApi';
import './AuthModal.css';

export default function AuthModal({ open, onClose, mode: initialMode = 'signin' }) {
  const [mode, setMode] = React.useState(initialMode);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  React.useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setName('');
      setError('');
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signup(name, email, password);
        setMode('signin');
        setError('Conta criada! Faça login agora.');
      } else {
        const res = await signin(email, password);
        login(res.token, res.user || { email });
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={mode === 'signin' ? 'Entrar' : 'Cadastrar'}>
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        {mode === 'signup' && (
          <label className="auth-form__label">
            <span className="auth-form__label-text">Nome</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              className="auth-form__input"
              placeholder="Seu nome"
            />
          </label>
        )}
        <label className="auth-form__label">
          <span className="auth-form__label-text">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-form__input"
            placeholder="seu@email.com"
          />
        </label>
        <label className="auth-form__label">
          <span className="auth-form__label-text">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="auth-form__input"
            placeholder="Mínimo 8 caracteres"
          />
        </label>
        {error && <div className="auth-form__error">{error}</div>}
        <div className="auth-form__actions">
          <Button type="submit" disabled={loading}>
            {mode === 'signin' ? 'Entrar' : 'Cadastrar'}
          </Button>
        </div>
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin');
            setError('');
          }}
          className="auth-form__switch"
        >
          {mode === 'signin' ? 'Ainda não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
        </button>
      </form>
    </Modal>
  );
}
