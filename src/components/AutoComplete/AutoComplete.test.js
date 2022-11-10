import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AutoComplete from './AutoComplete';

describe('<AutoComplete />', () => {
  test('it should mount', () => {
    render(<AutoComplete />);

    const autoComplete = screen.getByTestId('AutoComplete');

    expect(autoComplete).toBeInTheDocument();
  });

    test('it should obtain input', () => {
      const setStateMock = jest.fn();
      const useStateMock = (useState) => [useState, setStateMock];
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);

      render(<AutoComplete input="John"/>);

      expect(setStateMock).toHaveBeenCalledWith("John");
  });
});