import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BsFillCameraVideoFill} from "react-icons/bs";
import {useLocation} from "react-router-dom";

const SecComNavbar = () => {

    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <Navbar variant="dark" style={{backgroundColor: "rgba(0,0,0,0.60)"}}>
            <Container className="py-2 my-2 mx-3">
                <Navbar.Brand href="#home" className="pe-5"><BsFillCameraVideoFill color="red"/> SecCom</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="px-3" active={url === "/"}>Home</Nav.Link>
                        <Nav.Link href="/properties" className="px-3" active={url === "/properties"}>Properties</Nav.Link>
                        <Nav.Link href="/owners" className="px-3" active={url === "/owners"}>Owners</Nav.Link>
                        <Nav.Link href="/account" className="px-3" active={url === "/account"}>Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SecComNavbar;
