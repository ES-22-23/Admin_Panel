import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Authentication from './Authentication';

describe('<Authentication />', () => {
  test('it should mount', () => {
    render(<Authentication />);
    
    const authentication = screen.getByTestId('Authentication');

    expect(authentication).toBeInTheDocument();
  });
});