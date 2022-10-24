import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BsFillCameraVideoFill} from "react-icons/bs";

const SecComNavbar = () => {

    return (
        <Navbar variant="dark" style={{backgroundColor: "rgba(0,0,0,0.60)"}}>
            <Container className="py-2 my-2 mx-3">
                <Navbar.Brand href="#home" className="pe-5"><BsFillCameraVideoFill color="red"/> SecCom</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="px-3" active>Home</Nav.Link>
                        <Nav.Link href="/properties" className="px-3">Properties</Nav.Link>
                        <Nav.Link href="/owners" className="px-3">Owners</Nav.Link>
                        <Nav.Link href="/account" className="px-3">Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SecComNavbar;
