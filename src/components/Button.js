import React from 'react';
import './Button.css';

/**
 * Componente Button reutilizável.
 * Props principais:
 *  - variant: primary | ghost | danger | link (define estilos)
 *  - disabled: boolean (desabilita interação e aplica estilo)
 *  - loading: boolean (exibe spinner simples)
 */
export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
  disabled = false,
  loading = false,
  ariaLabel
}) {
  function handleClick(e) {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick && onClick(e);
  }

  return (
    <button
      className={`btn btn--${variant} ${disabled ? 'btn--disabled' : ''} ${loading ? 'btn--loading' : ''} ${className}`.trim()}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      aria-disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      <span className="btn__content">{children}</span>
    </button>
  );
}
