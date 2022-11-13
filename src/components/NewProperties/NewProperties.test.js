import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewProperties from './NewProperties';
import { toast } from 'react-toastify'

jest.mock('react-toastify', () => ({
    toast: {success: jest.fn(), error: jest.fn()}
}))

describe('<NewProperties />', () => {
    test('it should mount', () => {
        render(<NewProperties/>);

        const newProperties = screen.getByTestId('NewProperties');

        expect(newProperties).toBeInTheDocument();
    });

    test('it should notify unsuccessful submission', () => {
        render(<NewProperties/>);

        const button = screen.getByText("Save Property");
        fireEvent.click(button);

        expect(toast.success).not.toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalled();
    });
});