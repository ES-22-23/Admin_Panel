import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";

import SecComCarousel from "../SecComCarousel/SecComCarousel";
import {useKeycloak} from "@react-keycloak/web";

const Authentication = () => {

    const { keycloak, } = useKeycloak();

    return (
        <Container className="text-center justify-content-center d-flex py-4" data-testid="Authentication">
            <Row className="justify-content-center align-items-center d-flex mt-4">
                <Col className="col-lg-4 me-5">
                    <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                        <h2>SecCom</h2>
                        <h5>Smart Security</h5>
                        <h6 className="mt-4">SecCom Smart Security System is a Smart CCTV system with built-in intruder detection and alarms for enterprises.</h6>
                        <h6>
                            This system allows enterprises to create and run a smart CCTV system to improve the security of their buildings. It includes
                            Intruder detection powered by AI/ML modules and Intrusion Alarms triggered when an intruder is detected.
                        </h6>
                    </Card>
                    <Button variant="danger" className="px-3 w-50 mt-5" onClick={() => keycloak.login()}>Login</Button>
                </Col>
                <Col className="col-lg-5">
                    <SecComCarousel/>
                </Col>
            </Row>
        </Container>
    )
};

// keycloak-react-auth
Authentication.propTypes = {};

Authentication.defaultProps = {};

export default Authentication;
