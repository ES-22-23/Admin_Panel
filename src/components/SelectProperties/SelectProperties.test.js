import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectProperties from './SelectProperties';

describe('<SelectProperties />', () => {
  test('it should mount', () => {
    render(<SelectProperties />);
    
    const selectProperties = screen.getByTestId('SelectProperties');

    expect(selectProperties).toBeInTheDocument();
  });
});