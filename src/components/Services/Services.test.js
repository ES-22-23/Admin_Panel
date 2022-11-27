import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Services from './Services';

describe('<Services />', () => {
    test('it should mount', () => {
        render(<Services/>);

        const services = screen.getByTestId('Services');

        expect(services).toBeInTheDocument();
    });

    test('it should have a add service button', () => {
        render(<Services/>);

        const addServiceButton = screen.getByText("Add New");
        expect(addServiceButton).toBeInTheDocument();
        expect(addServiceButton).toHaveAttribute("href", "/new/services");
    });

    test('it should have a search bar', () => {
        render(<Services/>);

        const searchBar = screen.getByTestId('SearchBar');
        expect(searchBar).toBeInTheDocument();
    });
});