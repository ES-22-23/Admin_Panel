import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cameras from './Cameras';

describe('<Cameras />', () => {
  test('it should mount', () => {
    render(<Cameras />);
    
    const cameras = screen.getByTestId('Cameras');

    expect(cameras).toBeInTheDocument();
  });
});