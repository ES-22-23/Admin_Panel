import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Authentication from './Authentication';
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "../../Keycloak";

describe('<Authentication />', () => {
  test('it should mount', () => {

    let mockInitialized = true;
    let mockKeycloakStub = {};

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

    render(<ReactKeycloakProvider authClient={keycloak}>
      <Authentication /></ReactKeycloakProvider>);
    
    const authentication = screen.getByTestId('Authentication');

    expect(authentication).toBeInTheDocument();
  });
});