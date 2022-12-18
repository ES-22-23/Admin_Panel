import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import {createBrowserHistory} from "history";

import Container from "react-bootstrap/Container";
import {Spinner} from "react-bootstrap";
import {Flip, toast, ToastContainer} from "react-toastify";

import SecComNavbar from "./components/SecComNavbar/SecComNavbar";
import Home from "./components/Home/Home";
import Authentication from "./components/Authentication/Authentication";
import PrivateRoute from "./helpers/PrivateRoute";
import {useKeycloak} from "@react-keycloak/web";
import Account from "./components/Account/Account";
import Owners from "./components/Owners/Owners";
import OwnerProperties from "./components/OwnerProperties/OwnerProperties";
import Properties from "./components/Properties/Properties";
import NewProperties from "./components/NewProperties/NewProperties";
import History from "./components/History/History";
import NewOwners from "./components/NewOwners/NewOwners";
import NewServices from "./components/NewServices/NewServices";
import Services from "./components/Services/Services";
import Intrusions from "./components/Intrusions/Intrusions";
import SystemHealth from "./components/SystemHealth/SystemHealth";
import Notifications from "./components/Notifications/Notifications";
import {useEffect} from "react";
import {getVideos} from "./utils/IntrusionApiHandler";


function App() {

    const customHistory = createBrowserHistory();
    const {keycloak, initialized} = useKeycloak();

    const obtainIntrusions = (seconds) => {
        getVideos().then((response) => {

            const responseIntrusions = response.data;

            const currentTime = new Date();
            for (let idx in responseIntrusions) {

                const intrusion = responseIntrusions[idx];
                const difference = Math.floor((currentTime.getTime() - new Date(intrusion.timestamp).getTime()) / 1000);

                if (difference >= 0 && difference <= seconds) {
                    if (difference === 1) {
                        toast.warning("Intrusion detected 1 second ago " +
                            "[Property " + intrusion.propertyId + "].");
                    } else {
                        toast.warning("Intrusion detected " + difference + " seconds ago " +
                            "[Property " + intrusion.propertyId + "].");
                    }
                }
            }
        });
    }

    useEffect(() => {
        if (initialized) {

            // Hardcoded value (milliseconds to seconds)
            const seconds = 10;

            obtainIntrusions(seconds);
            const interval = setInterval(() => {
                obtainIntrusions(seconds);
            }, seconds * 1000)

            return () => {
                clearInterval(interval);
            }
        }
    }, [initialized]);

    if (!initialized) {
        return (
            <Container className="p-0 text-center align-items-center justify-content-center d-flex" style={{
                backgroundImage: "url(/BackgroundRedWhite2.jpg)",
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
                backgroundImage: "url(/BackgroundRedWhite2.jpg)",
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
        hideProgressBar={false}
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
            backgroundImage: "url(/BackgroundRedWhite2.jpg)",
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
                    <Route path="/owners/:username" element={<PrivateRoute><Owners/></PrivateRoute>}></Route>
                    <Route path="/new/owners" element={<PrivateRoute><NewOwners/></PrivateRoute>}></Route>
                    <Route path="/owners/:username/properties" element={<PrivateRoute><OwnerProperties/></PrivateRoute>}></Route>
                    <Route path="/properties" element={<PrivateRoute><Properties/></PrivateRoute>}></Route>
                    <Route path="/new/properties" element={<PrivateRoute><NewProperties/></PrivateRoute>}></Route>
                    <Route path="/intrusions" element={<PrivateRoute><Intrusions/></PrivateRoute>}></Route>
                    <Route path="/services" element={<PrivateRoute><Services/></PrivateRoute>}></Route>
                    <Route path="/services/:componentType" element={<PrivateRoute><Services/></PrivateRoute>}></Route>
                    <Route path="/new/services" element={<PrivateRoute><NewServices/></PrivateRoute>}></Route>
                    <Route path="/history" element={<PrivateRoute><History/></PrivateRoute>}></Route>
                    <Route path="/health" element={<PrivateRoute><SystemHealth/></PrivateRoute>}></Route>
                    <Route path="/notifications" element={<PrivateRoute><Notifications/></PrivateRoute>}></Route>
                    <Route path="*" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
                </Routes>
            </Router>
            {toastContainer}
        </Container>
    );
}

export default App;
