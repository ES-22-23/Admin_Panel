import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewServices from './NewServices';
import {toast} from "react-toastify";

jest.mock('react-toastify', () => ({
    toast: {success: jest.fn(), error: jest.fn()}
}))

describe('<NewServices />', () => {
    test('it should mount', () => {
        render(<NewServices/>);

        const newServices = screen.getByTestId('NewServices');

        expect(newServices).toBeInTheDocument();
    });

    describe('when the form is submitted without valid input', () => {
        test('it should notify unsuccessful submission', () => {
            render(<NewServices/>);

            const button = screen.getByText('Register Service');
            fireEvent.click(button);

            expect(toast.success).not.toHaveBeenCalled();
            expect(toast.error).toHaveBeenCalled();
        });
    });
});