import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import SecComNavbar from "./components/SecComNavbar/SecComNavbar";
import Home from "./components/Home/Home";
import Container from "react-bootstrap/Container";

function App() {
    return (
        /*
        <div style={{
            backgroundImage: "url(/Background.jpg)",
            backgroundRepeat: "no-repeat", backgroundSize: "cover", minHeight: "100vh", minWidth: "100vw"
        }}>
        <Container className="p-0" style={{backgroundColor: "#1f1e1e", backgroundSize: "cover", minHeight: "100vh", minWidth: "100vw"}}>
         */
        <Container className="p-0" style={{backgroundImage: "url(/Background2.jpg)", backgroundSize: "cover", minHeight: "100vh", minWidth: "100vw"}}>
            <Router>
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
