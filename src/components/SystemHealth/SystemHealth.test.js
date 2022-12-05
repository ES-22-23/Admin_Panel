import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SystemHealth from './SystemHealth';

describe('<SystemHealth />', () => {
  test('it should mount', () => {
    render(<SystemHealth />);
    
    const systemHealth = screen.getByTestId('SystemHealth');

    expect(systemHealth).toBeInTheDocument();
  });
});