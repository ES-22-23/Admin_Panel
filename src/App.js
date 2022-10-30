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

import PrivateRoute from "./helpers/PrivateRoute";
import {useKeycloak} from "@react-keycloak/web";
import {Spinner} from "react-bootstrap";
import Account from "./components/Account/Account";
import Owners from "./components/Owners/Owners";

function App() {

    const customHistory = createBrowserHistory();

    const {keycloak, initialized} = useKeycloak();

    if (!initialized) {
        return (
            <Container className="p-0 text-center align-items-center justify-content-center d-flex" style={{
                backgroundImage: "url(/Background2.jpg)",
                backgroundSize: "cover",
                minHeight: "100vh",
                minWidth: "100vw"
            }}>
                <Spinner animation="border" role="status"/>
            </Container>
        );
    }

    if (!keycloak.authenticated) {
        return (
            <Container className="p-0" style={{
                backgroundImage: "url(/Background2.jpg)",
                backgroundSize: "cover",
                minHeight: "100vh",
                maxWidth: "100vw"
            }}>
                <Router history={customHistory}>
                    <SecComNavbar/>
                    <Container className="text-center justify-content-center d-flex py-5" data-testid="Home">
                        <Routes>
                            <Route path="/" element={<Authentication/>}></Route>
                            <Route path="*" element={<Authentication/>}></Route>
                        </Routes>
                    </Container>
                </Router>
            </Container>
        );
    }

    return (
        <Container className="p-0" style={{
            backgroundImage: "url(/Background2.jpg)",
            backgroundSize: "cover",
            minHeight: "100vh",
            maxWidth: "100vw"
        }}>
            <Router history={customHistory}>
                <SecComNavbar/>
                <Routes>
                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
                    <Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>}></Route>
                    <Route path="/owners" element={<PrivateRoute><Owners/></PrivateRoute>}></Route>
                    <Route path="*" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
