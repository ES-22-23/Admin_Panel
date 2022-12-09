import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notifications from './Notifications';

describe('<Notifications />', () => {
  test('it should mount', () => {
    render(<Notifications />);
    
    const notifications = screen.getByTestId('Notifications');

    expect(notifications).toBeInTheDocument();
  });
});