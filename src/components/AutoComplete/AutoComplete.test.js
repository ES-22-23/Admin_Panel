import React, {useState as useStateMock} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AutoComplete from './AutoComplete';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('<AutoComplete />', () => {

    const setState = jest.fn();

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState]);
    });

    test('it should mount', () => {
        render(<AutoComplete/>);

        const autoComplete = screen.getByTestId('AutoComplete');

        expect(autoComplete).toBeInTheDocument();
    });

    test('it should obtain input', () => {
        render(<AutoComplete input="John"/>);

        expect(useStateMock).toHaveBeenCalledWith("John");
    });
});