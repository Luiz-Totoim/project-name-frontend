import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

test('fecha modal por ESC, overlay e botão fechar', () => {
  const onClose = jest.fn();
  render(
    <Modal open={true} onClose={onClose} title="Demo UI Kit">
      <div>Conteúdo de teste</div>
    </Modal>
  );

  // Fecha por ESC
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();

  onClose.mockClear();
  // Fecha por clique no overlay com role button
  const overlayButton = screen.getByRole('button', { name: /Fechar modal clicando fora/i });
  fireEvent.click(overlayButton);
  expect(onClose).toHaveBeenCalled();

  onClose.mockClear();
  // Fecha por botão X
  const closeBtn = screen.getByRole('button', { name: /^Fechar$/i });
  fireEvent.click(closeBtn);
  expect(onClose).toHaveBeenCalled();
});
