import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SecComNavbar from './SecComNavbar';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "/"
    })
}));

jest.mock("@react-keycloak/web", () => ({ useKeycloak: mockUseKeycloak }));


const username = "test";

function mockUseKeycloak() {

    const token = "A random string that is non zero length";
    const realmAccess = { roles: ["user"] };
    const userProfile = {
        username: username,
        email: "test@example.com",
        firstName: "Test",  // or given_name
        lastName: "User",   // or family_name
        name: "Test User",
    };
    const tokenParsed = {
        name: "Test User",
        preferred_username: username,
        email: "test@example.com",
    };

    const authClient = {
        authenticated: true,
        idToken: token,
        profile: userProfile,
        realm: "TestRealm",
        realmAccess,
        refreshToken: token,
        tokenParsed: tokenParsed,
        token,
    };

    return { initialized: true, keycloak: authClient };
}

describe('<SecComNavbar />', () => {
    test('it should mount', () => {
        render(<SecComNavbar/>);

        const secComNavbar = screen.getByTestId('SecComNavbar');
        expect(secComNavbar).toBeInTheDocument();
    });

    test('it should have the logout button', () => {
        render(<SecComNavbar/>);

        const button = screen.getByText("Logout " + username);
        expect(button).toBeInTheDocument();
    });

    test('navbar logo should redirect to /', () => {
        render(<SecComNavbar/>);

        const logo = screen.getByTestId("SecComLogo");

        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("href", "/");
    });

    test('it should have the home link', () => {
        render(<SecComNavbar/>);

        const link = screen.getByText("Home");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");
    });

    test('it should have the properties link', () => {
        render(<SecComNavbar/>);

        const dropdown = screen.getByText("Clients");
        expect(dropdown).toBeInTheDocument();

        fireEvent.click(dropdown);

        const link = screen.getByText("Properties");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/properties");
    });

    test('it should have the owners link', () => {
        render(<SecComNavbar/>);

        const dropdown = screen.getByText("Clients");
        expect(dropdown).toBeInTheDocument();

        fireEvent.click(dropdown);

        const link = screen.getByText("Owners");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/owners");
    });

    test('it should have the services link', () => {
        render(<SecComNavbar/>);

        const dropdown = screen.getByText("Services");
        expect(dropdown).toBeInTheDocument();

        fireEvent.click(dropdown);

        const link = screen.getByText("All");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/services");
    });

    test('it should have the history link', () => {
        render(<SecComNavbar/>);

        const dropdown = screen.getByText("System");
        expect(dropdown).toBeInTheDocument();

        fireEvent.click(dropdown);

        const link = screen.getByText("Events");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/history");
    });

    test('it should have the health link', () => {
        render(<SecComNavbar/>);

        const dropdown = screen.getByText("System");
        expect(dropdown).toBeInTheDocument();

        fireEvent.click(dropdown);

        const link = screen.getByText("Health");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/health");
    });

    test('it should have the account link', () => {
        render(<SecComNavbar/>);

        const link = screen.getByText("Account");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/account");
    });
});