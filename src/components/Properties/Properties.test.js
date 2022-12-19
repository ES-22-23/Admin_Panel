import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Properties from './Properties';

describe('<Properties />', () => {
    test('it should mount', () => {
        render(<Properties/>);

        const properties = screen.getByTestId('Properties');

        expect(properties).toBeInTheDocument();
    });

    test('it should have the add property button', () => {
        render(<Properties/>);

        const button = screen.getByText("New Property");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("href", "/new/properties");
    });

    test('it should have the search bar', () => {
        render(<Properties/>);

        const searchBar = screen.getByTestId('SearchBar');
        expect(searchBar).toBeInTheDocument();
    });
});