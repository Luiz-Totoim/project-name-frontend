import React, {useEffect} from 'react';
import './Modal.css';

export default function Modal({open, onClose, title, children}){
  useEffect(()=>{
    function onKey(e){ if(e.key==='Escape') onClose && onClose(); }
    if(open) document.addEventListener('keydown', onKey);
    return ()=> document.removeEventListener('keydown', onKey);
  },[open,onClose]);

  if(!open) return null;
  return (
    <div className="modal__overlay" role="dialog" aria-modal="true" aria-label={title || 'Modal'} onClick={e=>{ if(e.target.classList.contains('modal__overlay')) onClose && onClose(); }}>
      <div className="modal__panel">
        <header className="modal__header">
          <h3>{title}</h3>
          <button className="modal__close" aria-label="Fechar" onClick={onClose}>×</button>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
