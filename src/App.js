import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import {createBrowserHistory} from "history";

import Container from "react-bootstrap/Container";

import SecComNavbar from "./components/SecComNavbar/SecComNavbar";
import Home from "./components/Home/Home";
import Authentication from "./components/Authentication/Authentication";

// Keycloak handling
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./Keycloak"
import PrivateRoute from "./helpers/PrivateRoute";

function App() {

    const customHistory = createBrowserHistory();

    return (
        <Container className="p-0" style={{
            backgroundImage: "url(/Background2.jpg)",
            backgroundSize: "cover",
            minHeight: "100vh",
            minWidth: "100vw"
        }}>
            <ReactKeycloakProvider authClient={keycloak}>
                <Router history={customHistory}>
                    <SecComNavbar/>
                    <Routes>
                        <Route path="/" element={<Authentication/>}></Route>
                        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
                        <Route path="*" element={<Authentication/>}></Route>
                    </Routes>
                </Router>
            </ReactKeycloakProvider>
        </Container>
    );
}

export default App;
