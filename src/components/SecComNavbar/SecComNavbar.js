import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BsFillCameraVideoFill} from "react-icons/bs";
import {useLocation} from "react-router-dom";
import {Button, Col, NavDropdown} from "react-bootstrap";

import { useKeycloak } from "@react-keycloak/web";

const SecComNavbar = () => {

    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    const { keycloak, initialized } = useKeycloak();

    if (initialized && !keycloak.authenticated) {
        return (
            <Navbar className="justify-content-center" style={{backgroundColor: "rgba(0,0,0,0.90)"}} expand="lg">
                <Navbar.Brand href="/" className="p-3 text-white" data-testid="SecComLogo">
                    <BsFillCameraVideoFill color="#DC3545"/> SecCom
                </Navbar.Brand>
            </Navbar>
        );
    }

    return (
        <Navbar variant="dark" style={{backgroundColor: "rgba(0,0,0,0.90)"}} data-testid="SecComNavbar">
            <Container className="py-2 my-2">
                <Navbar.Brand href="/" className="pe-5" data-testid="SecComLogo">
                    <BsFillCameraVideoFill color="#DC3545"/> SecCom
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" active={url === "/" || url === "/home"}>Home</Nav.Link>
                        <NavDropdown title="Clients" id="basic-nav-dropdown" menuVariant="dark"
                                     active={url === "/intrusions" || url === "/properties" || url === "/owners"}>
                            <NavDropdown.Item href="/intrusions" active={url === "/intrusions"}>Intrusions</NavDropdown.Item>
                            <NavDropdown.Item href="/properties" active={url === "/properties"}>Properties</NavDropdown.Item>
                            <NavDropdown.Item href="/owners" active={url === "/owners"}>Owners</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Services" id="Services" active={url === "/services" ||
                            url === "/services/alarms" || url === "/services/cameras"} menuVariant="dark">
                            <NavDropdown.Item href="/services">All</NavDropdown.Item>
                            <NavDropdown.Item href="/services/alarms">Alarms</NavDropdown.Item>
                            <NavDropdown.Item href="/services/cameras">Cameras</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="System" id="System" active={url === "/health" || url === "/history" || url === "/notifications"}
                                     menuVariant="dark">
                            <NavDropdown.Item href="/notifications">Notifications</NavDropdown.Item>
                            <NavDropdown.Item href="/history">Events</NavDropdown.Item>
                            <NavDropdown.Item href="/health">Health</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/account" active={url === "/account"}>Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Col className="justify-content-end d-flex">
                    <Button variant="outline-danger" className="px-3" onClick={() => keycloak.logout()}>Logout {keycloak.tokenParsed.preferred_username}</Button>
                </Col>
            </Container>
        </Navbar>
    );
};

export default SecComNavbar;
