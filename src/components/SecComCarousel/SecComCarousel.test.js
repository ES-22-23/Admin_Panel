import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SecComCarousel from './SecComCarousel';

describe('<SecComCarousel />', () => {
  test('it should mount', () => {
    render(<SecComCarousel />);
    
    const secComCarousel = screen.getByTestId('SecComCarousel');

    expect(secComCarousel).toBeInTheDocument();
  });
});