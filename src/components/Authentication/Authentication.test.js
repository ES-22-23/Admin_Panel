import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Authentication from './Authentication';

let mockInitialized = false;
let mockKeycloakStub = {};

jest.mock("@react-keycloak/web", () => {
    const originalModule = jest.requireActual("@react-keycloak/web");
    return {
        ...originalModule,
        useKeycloak: () => [
            mockKeycloakStub,
            mockInitialized
        ]
    };
});

describe('<Authentication />', () => {
    test('it should mount', () => {
        render(<Authentication/>);

        const authentication = screen.getByTestId('Authentication');
        expect(authentication).toBeInTheDocument();
    });

    test('it should have the login button', () => {
        render(<Authentication/>);

        const button = screen.getByText("Login");
        expect(button).toBeInTheDocument();
    });
});