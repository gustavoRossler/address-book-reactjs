import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Aplicação de demonstração com recursos de um livro de endereços./i);
  expect(linkElement).toBeInTheDocument();
});
