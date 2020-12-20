import React from 'react';
import { render } from '@testing-library/react';
import App from './';

test('renders title link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/eur-sek/);
  expect(linkElement).toBeInTheDocument();
});