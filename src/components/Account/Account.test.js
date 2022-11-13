import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Account from './Account';

jest.mock("@react-keycloak/web", () => ({useKeycloak: mockUseKeycloak}));

const username = "test";
const email = "test@example.com";
const firstName = "Test";
const lastName = "User";

function mockUseKeycloak() {

    const token = "A random string that is non zero length";
    const realmAccess = {roles: ["user"]};
    const userProfile = {
        username: username,
        email: email,
        firstName: firstName,  // or given_name
        lastName: lastName,   // or family_name
        name: firstName + " " + lastName,
    };
    const tokenParsed = {
        name: firstName + " " + lastName,
        preferred_username: username,
        email: email,
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

    return {initialized: true, keycloak: authClient};
}

describe('<Account />', () => {

    test('it should mount', () => {
        render(<Account/>);

        const account = screen.getByTestId('Account');
        expect(account).toBeInTheDocument();
    });

    test('it should display the User username', () => {
        render(<Account/>);

        const usernameElement = screen.getByText(username);
        expect(usernameElement).toBeInTheDocument();
    });

    test('it should display the User email', () => {
        render(<Account/>);

        const emailElement = screen.getByText(email);
        expect(emailElement).toBeInTheDocument();
    });

    test('it should display the User full name', () => {
        render(<Account/>);

        const nameElement = screen.getByText(firstName + " " + lastName);
        expect(nameElement).toBeInTheDocument();
    });
});