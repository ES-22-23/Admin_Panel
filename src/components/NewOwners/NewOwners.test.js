import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewOwners from './NewOwners';
import {toast} from "react-toastify";

jest.mock('react-toastify', () => ({
    toast: {success: jest.fn(), error: jest.fn()}
}));

describe('<NewOwners />', () => {
    test('it should mount', () => {
        render(<NewOwners/>);

        const newOwners = screen.getByTestId('NewOwners');

        expect(newOwners).toBeInTheDocument();
    });

    test('it should have a button to go back', () => {
        render(<NewOwners/>);

        const goBackButton = screen.getByText('Go Back');

        expect(goBackButton).toBeInTheDocument();
        expect(goBackButton).toHaveAttribute('href', '/owners');
    });

    describe('when the form is submitted without valid input', () => {
        test('it should notify unsuccessful submission', () => {
            render(<NewOwners/>);

            const button = screen.getByText('Register Owner');
            fireEvent.click(button);

            expect(toast.success).not.toHaveBeenCalled();
            expect(toast.error).toHaveBeenCalled();
        });
    });
});