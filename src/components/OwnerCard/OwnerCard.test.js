import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OwnerCard from './OwnerCard';

describe('<OwnerCard />', () => {
  test('it should mount', () => {
    render(<OwnerCard />);
    
    const ownerCard = screen.getByTestId('OwnerCard');

    expect(ownerCard).toBeInTheDocument();
  });
});