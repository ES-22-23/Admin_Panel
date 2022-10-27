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

function App() {

    const customHistory = createBrowserHistory();

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
