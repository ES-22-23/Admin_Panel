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

    test('it should display the correct number of intrusions', () => {
        render(<Intrusions/>);

        const intrusions = screen.getByTestId('NumberOfIntrusions');
        expect(intrusions).toBeInTheDocument();
        expect(intrusions).toHaveTextContent("0");
    });

    test('it should display the correct number of total intrusions', () => {
        render(<Intrusions/>);

        const intrusions = screen.getByTestId('NumberOfTotalIntrusions');
        expect(intrusions).toBeInTheDocument();
        expect(intrusions).toHaveTextContent("0");
    });
});