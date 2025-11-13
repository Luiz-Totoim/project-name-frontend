import React from 'react';
import './Button.css';

export default function Button({children, onClick, type='button', className=''}){
  return (
    <button className={`btn ${className}`.trim()} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
