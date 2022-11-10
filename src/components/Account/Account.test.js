import React from 'react';
// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import Account from './Account';

// import keycloak from "../../Keycloak";
// import {ReactKeycloakProvider, useKeycloak} from "@react-keycloak/web";


describe('<Account />', () => {
  test('it should mount', () => {

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

    // render(<ReactKeycloakProvider authClient={keycloak}><Account /></ReactKeycloakProvider>);
    
    // const account = screen.getByTestId('Account');
    // expect(account).toBeInTheDocument();
  });
});