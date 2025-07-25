import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('Makes sure the "Reserve a Table" button renders correctly', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const reserveButton = screen.getByText(/Reserve a Table/i);
    expect(reserveButton).toBeInTheDocument();
  });
});