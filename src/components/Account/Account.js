import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Card, Col} from "react-bootstrap";

import {useKeycloak} from "@react-keycloak/web";

const Account = () => {

    const { keycloak, } = useKeycloak();

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Account">
            <Row className="justify-content-center align-items-center d-flex mt-4 w-75" style={{maxWidth: "600px"}}>
                <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                    <Row>
                        <h3 className="mb-4">Account</h3>
                        <Col className="my-2 col-6">
                            <h4>Full Name</h4>
                            <h5 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{keycloak.tokenParsed.name || "---"}</h5>
                        </Col>
                        <Col className="my-2 col-6">
                            <h4>Username</h4>
                            <h5 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{keycloak.tokenParsed.preferred_username || "---"}</h5>
                        </Col>
                        <Col className="my-2">
                            <h4>Email</h4>
                            <h5 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{keycloak.tokenParsed.email || "---"} <span style={{fontSize: "0.8rem", color: "#DC3545"}}>{keycloak.tokenParsed.email_verified ? "Verified" : "Not Verified"}</span>
                            </h5>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
}

Account.propTypes = {};

Account.defaultProps = {};

export default Account;
