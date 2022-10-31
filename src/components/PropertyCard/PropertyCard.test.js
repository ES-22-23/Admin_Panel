import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PropertyCard from './PropertyCard';

describe('<PropertyCard />', () => {
  test('it should mount', () => {
    render(<PropertyCard />);
    
    const propertyCard = screen.getByTestId('PropertyCard');

    expect(propertyCard).toBeInTheDocument();
  });
});