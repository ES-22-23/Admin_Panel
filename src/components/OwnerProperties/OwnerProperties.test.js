import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OwnerProperties from './OwnerProperties';

describe('<OwnerProperties />', () => {
  test('it should mount', () => {
    render(<OwnerProperties />);
    
    const ownerProperties = screen.getByTestId('OwnerProperties');

    expect(ownerProperties).toBeInTheDocument();
  });
});