import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectServices from './SelectServices';

describe('<SelectServices />', () => {
    test('it should mount', () => {
        render(<SelectServices/>);

        const selectServices = screen.getByTestId('SelectServices');

        expect(selectServices).toBeInTheDocument();
    });

    test('it should mount without selected service', () => {
        render(<SelectServices/>);

        const selectedService = screen.getByTestId('SelectedService');

        expect(selectedService).toBeInTheDocument();
        expect(selectedService).toHaveTextContent('Select a Service');
    });
});