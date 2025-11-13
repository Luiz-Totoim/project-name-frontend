import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

test('dispara onSearch com termo válido e mostra erro com termo curto', async () => {
  const user = userEvent.setup();
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);

  const input = screen.getByLabelText(/Pesquisar/i);
  const button = screen.getByRole('button', { name: /Procurar/i });

  // termo curto -> erro
  await user.clear(input);
  await user.type(input, 'a');
  await user.click(button);
  expect(screen.getByText(/Use pelo menos 2 caracteres./i)).toBeInTheDocument();

  // termo válido -> dispara onSearch
  await user.clear(input);
  await user.type(input, 'noticias');
  await user.click(button);
  expect(onSearch).toHaveBeenCalledWith('noticias');
});
