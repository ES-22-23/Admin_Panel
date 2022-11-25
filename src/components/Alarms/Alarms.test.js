import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Alarms from './Alarms';

describe('<Alarms />', () => {
  test('it should mount', () => {
    render(<Alarms />);
    
    const alarms = screen.getByTestId('Alarms');

    expect(alarms).toBeInTheDocument();
  });
});