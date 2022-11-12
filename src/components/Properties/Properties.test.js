import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Properties from './Properties';

describe('<Properties />', () => {
  test('it should mount', () => {
    render(<Properties />);
    
    const properties = screen.getByTestId('Properties');

    expect(properties).toBeInTheDocument();
  });
});