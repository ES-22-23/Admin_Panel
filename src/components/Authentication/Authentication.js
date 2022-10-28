import React, {useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";

import SecComCarousel from "../SecComCarousel/SecComCarousel";
import {useKeycloak} from "@react-keycloak/web";

const Authentication = () => {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        if (keycloak.authenticated) {
            // Redirect to home page
            window.location.href = "/home";
        }
    }, [keycloak.authenticated]);

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Home">
            <Row className="justify-content-center align-items-center d-flex mt-4">
                <Col className="col-4 me-5">
                    <Card className="p-5 text-white" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                        <h2>SecCom</h2>
                        <h5>Smart Security</h5>
                        <h6 className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis ligula non magna
                            tristique, congue aliquam velit fringilla. Nullam orci enim, tincidunt quis euismod eu, viverra
                            eget erat. Suspendisse potenti. Aenean volutpat justo et lacus egestas ultrices. In hac
                            habitasse platea dictumst. Nam porta leo quis est rhoncus, eget fermentum leo varius. Aenean
                            eleifend vestibulum quam, sed aliquam libero volutpat nec.
                        </h6>
                    </Card>
                    <Button variant="danger" className="px-3 w-25 mt-5" onClick={() => keycloak.login()}>Login</Button>
                </Col>
                <Col className="col-5">
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
