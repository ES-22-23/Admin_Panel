import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AlarmCard from './AlarmCard';

describe('<AlarmCard />', () => {
  test('it should mount', () => {
    render(<AlarmCard />);
    
    const alarmCard = screen.getByTestId('AlarmCard');

    expect(alarmCard).toBeInTheDocument();
  });
});