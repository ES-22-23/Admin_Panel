import React from 'react';
// import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import SecComNavbar from './SecComNavbar';

// import keycloak from "../../Keycloak";
// import {ReactKeycloakProvider, useKeycloak} from "@react-keycloak/web";

let mockInitialized = true;
let mockKeycloakStub = {"tokenParsed": {"name": ""}};

jest.mock("@react-keycloak/web", () => {
    const originalModule = jest.requireActual("@react-keycloak/web");
    return {
        ...originalModule,
        useKeycloak: () =>  [
            mockKeycloakStub,
            mockInitialized
        ]
    };
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "/"
    })
}));

describe('<SecComNavbar />', () => {
    test('it should mount', () => {
        // render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        // const secComNavbar = screen.getByTestId('SecComNavbar');
        // expect(secComNavbar).toBeInTheDocument();
    });
});

/*
describe('<SecComNavbar />', () => {
    test('it should mount', () => {
        render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        const secComNavbar = screen.getByTestId('SecComNavbar');
        expect(secComNavbar).toBeInTheDocument();
    });

    test('it should have the logout button', () => {
        render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        const button = screen.getByText("Logout");
        expect(button).toBeInTheDocument();
    });

    test('logout button should redirect to /logout', () => {
        render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        const button = screen.getByText("Logout");

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("href", "/logout");
    });

    test('navbar logo should redirect to /', () => {
        render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        const logo = screen.getByTestId("SecComLogo");

        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("href", "/");
    });

    test('navbar should have the home link', () => {
        render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        const link = screen.getByText("Home");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");
    });

    test('navbar should have the properties link', () => {
        render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        const link = screen.getByText("Properties");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/properties");
    });

    test('navbar should have the owners link', () => {
        render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        const link = screen.getByText("Owners");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/owners");
    });

    test('navbar should have the account link', () => {
        render(<ReactKeycloakProvider authClient={keycloak}><SecComNavbar/></ReactKeycloakProvider>);

        const link = screen.getByText("Account");

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/account");
    });
});
 */