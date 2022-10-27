import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";

import SecComCarousel from "../SecComCarousel/SecComCarousel";

const Authentication = () => {

    /*
    <Image src={background} style={{borderRadius: "50px", width: "20vw", height: "20vw", objectFit: "cover"}} fluid/>
    <Button variant="outline-danger" className="px-3 w-25 mt-5" href="/login">Login</Button>
     */
    return (
        <Container className="text-center justify-content-center d-flex my-5" data-testid="Home">
            <Row className="justify-content-center align-items-center d-flex mt-4">
                <Col>

                    <Button variant="outline-danger" className="px-3 w-25 mt-5" href="/login">Login</Button>
                </Col>
                <Col className="col-5" >
                    <SecComCarousel />
                </Col>
            </Row>
        </Container>
    )
};

Authentication.propTypes = {};

Authentication.defaultProps = {};

export default Authentication;
