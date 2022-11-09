import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AutoComplete from './AutoComplete';

describe('<AutoComplete />', () => {
  test('it should mount', () => {
    render(<AutoComplete />);
    
    const autoComplete = screen.getByTestId('AutoComplete');

    expect(autoComplete).toBeInTheDocument();
  });
});