import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewProperties from './NewProperties';

describe('<NewProperties />', () => {
  test('it should mount', () => {
    render(<NewProperties />);
    
    const newProperties = screen.getByTestId('NewProperties');

    expect(newProperties).toBeInTheDocument();
  });
});