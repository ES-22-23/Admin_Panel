import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectProperties from './SelectProperties';

describe('<SelectProperties />', () => {
    test('it should mount', () => {
        render(<SelectProperties/>);

        const selectProperties = screen.getByTestId('SelectProperties');

        expect(selectProperties).toBeInTheDocument();
    });

    test('it should mount without selected property', () => {
        render(<SelectProperties/>);

        const selectedProperty = screen.getByTestId('SelectedProperty');

        expect(selectedProperty).toBeInTheDocument();
        expect(selectedProperty).toHaveTextContent('Select a Property');
    });
});