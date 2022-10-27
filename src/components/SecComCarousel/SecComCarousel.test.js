import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SecComCarousel from './SecComCarousel';
import {BrowserRouter} from "react-router-dom";

describe('<SecComCarousel />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><SecComCarousel /></BrowserRouter>);
    
    const secComCarousel = screen.getByTestId('SecComCarousel');

    expect(secComCarousel).toBeInTheDocument();
  });
});