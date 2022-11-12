import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Owners from './Owners';

describe('<Owners />', () => {
    test('it should mount', () => {
        render(<Owners/>);

        const owners = screen.getByTestId('Owners');

        expect(owners).toBeInTheDocument();
    });

    test('it should have the add owner button', () => {
        render(<Owners/>);

        const button = screen.getByText("Add New");
        expect(button).toBeInTheDocument();
    });
});