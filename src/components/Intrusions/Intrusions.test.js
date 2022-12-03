import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Intrusions from './Intrusions';

describe('<Intrusions />', () => {
    test('it should mount', () => {
        render(<Intrusions/>);

        const intrusions = screen.getByTestId('Intrusions');

        expect(intrusions).toBeInTheDocument();
    });

    test('it should have a search bar', () => {
        render(<Intrusions/>);

        const searchBar = screen.getByTestId('SearchBar');

        expect(searchBar).toBeInTheDocument();
    });
});