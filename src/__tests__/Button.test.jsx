import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button';

test('variant ghost aplica classe e loading impede clique', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Button variant="ghost" loading onClick={onClick}>Salvar</Button>);

  const btn = screen.getByRole('button', { name: /Salvar/i });
  expect(btn.className).toMatch(/btn--ghost/);
  expect(screen.getByRole('button', { name: /Salvar/i })).toHaveAttribute('aria-disabled', 'true');
  // nosso spinner não tem role, então testamos pela classe
  expect(document.querySelector('.btn__spinner')).toBeInTheDocument();

  await user.click(btn);
  expect(onClick).not.toHaveBeenCalled();
});
