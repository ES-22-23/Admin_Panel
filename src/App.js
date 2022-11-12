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
import OwnerProperties from "./components/OwnerProperties/OwnerProperties";
import Properties from "./components/Properties/Properties";
import NewProperties from "./components/NewProperties/NewProperties";

import {Flip, ToastContainer} from "react-toastify";

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
                    <Container className="text-center justify-content-center d-flex py-5">
                        <Routes>
                            <Route path="/" element={<Authentication/>}></Route>
                            <Route path="*" element={<Authentication/>}></Route>
                        </Routes>
                    </Container>
                </Router>
            </Container>
        );
    }

    let toastContainer = <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        theme={"light"}
        rtl={false}
        transition={Flip}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        style={{color: "#000000"}}/>;

    return (
        <Container className="p-0" style={{
            backgroundImage: "url(/Background2.jpg)",
            backgroundSize: "cover",
            minHeight: "100vh",
            maxWidth: "100vw"
        }}>
            <Router history={customHistory}>
                <SecComNavbar keycloak={keycloak}/>
                <Routes>
                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
                    <Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>}></Route>
                    <Route path="/owners" element={<PrivateRoute><Owners/></PrivateRoute>}></Route>
                    <Route path="/owners/:username/" element={<PrivateRoute><Owners/></PrivateRoute>}></Route>
                    <Route path="/owners/:username/properties" element={<PrivateRoute><OwnerProperties/></PrivateRoute>}></Route>
                    <Route path="/properties" element={<PrivateRoute><Properties/></PrivateRoute>}></Route>
                    <Route path="/new/properties" element={<PrivateRoute><NewProperties/></PrivateRoute>}></Route>
                    <Route path="*" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
                </Routes>
            </Router>
            {toastContainer}
        </Container>
    );
}

export default App;
