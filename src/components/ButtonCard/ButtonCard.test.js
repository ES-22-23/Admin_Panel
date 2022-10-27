import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonCard from './ButtonCard';
import {BrowserRouter} from "react-router-dom";

describe('<ButtonCard />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><ButtonCard title="Properties"/></BrowserRouter>);
    
    const buttonCard = screen.getByTestId('PropertiesButton');
    expect(buttonCard).toBeInTheDocument();
  });

});