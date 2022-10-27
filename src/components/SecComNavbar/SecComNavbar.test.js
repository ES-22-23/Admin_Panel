import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SecComNavbar from './SecComNavbar';
import {BrowserRouter} from "react-router-dom";

describe('<SecComNavbar />', () => {
    test('it should mount', () => {
        render(<BrowserRouter><SecComNavbar/></BrowserRouter>);

        const secComNavbar = screen.getByTestId('SecComNavbar');

        expect(secComNavbar).toBeInTheDocument();
    });

    test('it should have the logout button', () => {
        render(<BrowserRouter><SecComNavbar/></BrowserRouter>);

        const button = screen.getByText("Logout");
        expect(button).toBeInTheDocument();
    });

    test('logout button should redirect to /logout', () => {
        render(<BrowserRouter><SecComNavbar/></BrowserRouter>);

        const button = screen.getByText("Logout");

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("href", "/logout");
    });

    test('navbar logo should redirect to /', () => {
        render(<BrowserRouter><SecComNavbar/></BrowserRouter>);

        const logo = screen.getByTestId("SecComLogo");

        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("href", "/");
    });

    test('navbar should have the home link', () => {
        render(<BrowserRouter><SecComNavbar/></BrowserRouter>);

        const link = screen.getByText("Home");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");
    });

    test('navbar should have the properties link', () => {
        render(<BrowserRouter><SecComNavbar/></BrowserRouter>);

        const link = screen.getByText("Properties");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/properties");
    });

    test('navbar should have the owners link', () => {
        render(<BrowserRouter><SecComNavbar/></BrowserRouter>);

        const link = screen.getByText("Owners");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/owners");
    });

    test('navbar should have the account link', () => {
        render(<BrowserRouter><SecComNavbar/></BrowserRouter>);

        const link = screen.getByText("Account");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/account");
    });
});