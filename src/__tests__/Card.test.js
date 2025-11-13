import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

const article = {
  title: 'Título de teste',
  description: 'Descrição curta',
  source: { name: 'Fonte X' },
  url: 'https://example.com/teste',
  urlToImage: '',
  publishedAt: new Date().toISOString()
};

test('renderiza título e link com target/rel corretos', () => {
  render(<Card article={article} />);
  const title = screen.getByText('Título de teste');
  expect(title).toBeInTheDocument();
  const link = title.closest('a');
  expect(link).toHaveAttribute('href', article.url);
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
