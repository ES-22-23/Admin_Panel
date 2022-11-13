import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';
import {BrowserRouter} from "react-router-dom";

describe('<Home />', () => {
    test('it should mount', () => {
        render(<BrowserRouter><Home/></BrowserRouter>);

        const home = screen.getByTestId('Home');

        expect(home).toBeInTheDocument();
    });

    test('it should have three buttons cards', () => {
        render(<BrowserRouter><Home/></BrowserRouter>);

        let button;

        button = screen.getByTestId("PropertiesButton");
        expect(button).toBeInTheDocument();

        button = screen.getByTestId("OwnersButton");
        expect(button).toBeInTheDocument();

        button = screen.getByTestId("AccountButton");
        expect(button).toBeInTheDocument();
    });

});