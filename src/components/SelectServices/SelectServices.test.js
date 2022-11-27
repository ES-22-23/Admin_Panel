import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectServices from './SelectServices';

describe('<SelectServices />', () => {
  test('it should mount', () => {
    render(<SelectServices />);
    
    const selectServices = screen.getByTestId('SelectServices');

    expect(selectServices).toBeInTheDocument();
  });
});