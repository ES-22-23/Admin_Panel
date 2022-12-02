import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoModal from './VideoModal';

describe('<VideoModal />', () => {
  test('it should mount', () => {
    render(<VideoModal />);
    
    const videoModal = screen.getByTestId('VideoModal');

    expect(videoModal).toBeInTheDocument();
  });
});