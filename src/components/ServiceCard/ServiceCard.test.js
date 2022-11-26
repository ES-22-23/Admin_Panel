import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ServiceCard from './ServiceCard';

describe('<ServiceCard />', () => {
  test('it should mount', () => {
    render(<ServiceCard />);
    
    const serviceCard = screen.getByTestId('ServiceCard');

    expect(serviceCard).toBeInTheDocument();
  });
});