import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import SecComNavbar from "./components/SecComNavbar/SecComNavbar";
import Home from "./components/Home/Home";
import Container from "react-bootstrap/Container";
import {createBrowserHistory} from "history";
import Authentication from "./components/Authentication/Authentication";

function App() {

    const customHistory = createBrowserHistory();

    const token = localStorage.getItem('token');

    if (!token) {
        return(
            <Container className="p-0" style={{backgroundImage: "url(/Background2.jpg)", backgroundSize: "cover", minHeight: "100vh", minWidth: "100vw"}}>
                <Router history={customHistory}>
                    <SecComNavbar/>
                    <Routes>
                        <Route path="*" element={<Authentication/>}></Route>
                    </Routes>
                </Router>
            </Container>
        );
    }


    return (
        <Container className="p-0" style={{backgroundImage: "url(/Background2.jpg)", backgroundSize: "cover", minHeight: "100vh", minWidth: "100vw"}}>
            <Router history={customHistory}>
                <SecComNavbar/>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="*" element={<Home/>}></Route>
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
