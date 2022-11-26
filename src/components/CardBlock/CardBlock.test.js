import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardBlock from './CardBlock';

describe('<CardBlock />', () => {
  test('it should mount', () => {
    render(<CardBlock />);
    
    const cardBlock = screen.getByTestId('CardBlock');

    expect(cardBlock).toBeInTheDocument();
  });
});