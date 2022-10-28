import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useKeycloak} from "@react-keycloak/web";
import {Card, Col} from "react-bootstrap";
import {BsEnvelopeFill, BsFillPersonLinesFill} from "react-icons/bs";

const Account = () => {

    const { keycloak, } = useKeycloak();

    console.log(keycloak.tokenParsed);

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Account">
            <Row className="justify-content-center align-items-center d-flex mt-4 w-75" style={{maxWidth: "600px"}}>
                <Card className="p-5 text-white" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                    <Row>
                        <h3>Account</h3>
                        <Col className="my-3 col-6">
                            <h3><BsFillPersonLinesFill color="red"/> Full Name</h3>
                            <h5 className="p-4  mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{keycloak.tokenParsed.name}</h5>
                        </Col>
                        <Col className="my-3 col-6">
                            <h3><BsEnvelopeFill color="red"/> Username</h3>
                            <h5 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{keycloak.tokenParsed.preferred_username}</h5>
                        </Col>
                        <Col className="my-3">
                            <h3><BsEnvelopeFill color="red"/> Email</h3>
                            <h5 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{keycloak.tokenParsed.email} <span style={{fontSize: "0.8rem", color: "red"}}>{keycloak.tokenParsed.email_verified ? "Verified" : "Not Verified"}</span>
                            </h5>
                        </Col>
                    </Row>
                    <Row>
                        <h6 className="mt-5">Application Client ID</h6>
                        <p>{keycloak.clientId}</p>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
}

Account.propTypes = {};

Account.defaultProps = {};

export default Account;
