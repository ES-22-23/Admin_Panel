import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BsFillCameraVideoFill} from "react-icons/bs";
import {useLocation} from "react-router-dom";
import {Button, Col} from "react-bootstrap";

const SecComNavbar = () => {

    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    const token = localStorage.getItem('token');
    if (!token) {
        return (
            <Navbar className="justify-content-center" style={{backgroundColor: "rgba(0,0,0,0.60)"}} expand="lg">
                <Navbar.Brand href="/" className="py-3 text-white" data-testid="SecComLogo">
                    <BsFillCameraVideoFill /> SecCom
                </Navbar.Brand>
            </Navbar>
        );
    }

    return (
        <Navbar variant="dark" style={{backgroundColor: "rgba(0,0,0,0.70)"}} data-testid="SecComNavbar">
            <Container className="py-2 my-2">
                <Navbar.Brand href="/" className="pe-5" data-testid="SecComLogo">
                    <BsFillCameraVideoFill color="red"/> SecCom
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="px-3" active={url === "/" || url === "/home.feature"}>Home</Nav.Link>
                        <Nav.Link href="/properties" className="px-3" active={url === "/properties"}>Properties</Nav.Link>
                        <Nav.Link href="/owners" className="px-3" active={url === "/owners"}>Owners</Nav.Link>
                        <Nav.Link href="/account" className="px-3" active={url === "/account"}>Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Col className="justify-content-end d-flex">
                    <Button variant="outline-danger" className="px-3" href="/logout">Logout</Button>
                </Col>
            </Container>
        </Navbar>
    );
};

export default SecComNavbar;
