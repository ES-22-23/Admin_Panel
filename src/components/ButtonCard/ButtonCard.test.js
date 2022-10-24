import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonCard from './ButtonCard';

describe('<ButtonCard />', () => {
  test('it should mount', () => {
    render(<ButtonCard />);
    
    const buttonCard = screen.getByTestId('ButtonCard');

    expect(buttonCard).toBeInTheDocument();
  });
});