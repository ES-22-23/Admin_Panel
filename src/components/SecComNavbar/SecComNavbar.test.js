import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SecComNavbar from './SecComNavbar';

describe('<SecComNavbar />', () => {
  test('it should mount', () => {
    render(<SecComNavbar />);
    
    const secComNavbar = screen.getByTestId('SecComNavbar');

    expect(secComNavbar).toBeInTheDocument();
  });
});