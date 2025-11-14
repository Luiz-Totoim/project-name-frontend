import React, { useEffect, useRef } from 'react';
import './Modal.css';

/**
 * Modal acessível com foco inicial, fechamento via ESC, click no overlay e botão X.
 */
export default function Modal({ open, onClose, title, children }) {
  const panelRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose && onClose();
      if (e.key === 'Tab' && panelRef.current) {
        // Focus trap simples
        const focusable = panelRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      // Foco inicial
      focusTimeoutRef.current = setTimeout(() => {
        if (panelRef.current) {
          const autoFocus = panelRef.current.querySelector('[data-autofocus]');
          (autoFocus || panelRef.current).focus();
        }
      }, 10);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
        focusTimeoutRef.current = null;
      }
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="modal__overlay"
      role="button"
      tabIndex={0}
      aria-label="Fechar modal clicando fora"
      onClick={(e) => {
        if (e.target.classList.contains('modal__overlay')) onClose && onClose();
      }}
      onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); onClose && onClose(); } }}
    >
      <div className="modal__panel" ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title || 'Modal'}>
        <header className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" aria-label="Fechar" onClick={onClose}>×</button>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
