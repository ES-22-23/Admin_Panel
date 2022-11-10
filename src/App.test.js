import { render } from '@testing-library/react';
import App from './App';
import keycloak from "./Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";

test('renders learn react link', () => {
  render(<ReactKeycloakProvider authClient={keycloak}><App /></ReactKeycloakProvider>);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
