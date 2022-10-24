import logo from './logo.svg';
import './App.css';

import Row from "react-bootstrap/Row";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import SecComNavbar from "./components/SecComNavbar/SecComNavbar";

function App() {
    return (
        <div style={{
            backgroundImage: "url(/Background_2.png)",
            backgroundRepeat: "no-repeat", backgroundSize: "cover", minHeight: "100vh", minWidth: "100vw"
        }}>
            <Row className="mx-5">
                <SecComNavbar title="Home"/>
                <Router>
                    <Routes>

                    </Routes>
                </Router>
            </Row>
        </div>
    );
}

export default App;
