import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Properties from './Properties';
import Owners from "../Owners/Owners";

describe('<Properties />', () => {
    test('it should mount', () => {
        render(<Properties/>);

        const properties = screen.getByTestId('Properties');

        expect(properties).toBeInTheDocument();
    });

    test('it should have the add property button', () => {
        render(<Owners/>);

        const button = screen.getByText("Add New");
        expect(button).toBeInTheDocument();
    });
});