import React from 'react';
import './NewProperties.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Form} from "react-bootstrap";
import {BsFillPersonFill} from "react-icons/bs";
import {FaHouseUser} from "react-icons/fa";
import {createProperty} from "../../utils/ApiHandler";

const NewProperties = () => {

    const [name, setName] = React.useState("");
    const [owner, setOwner] = React.useState("");
    const [address, setAddress] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const property = {"name": name, "address": address, "owner": owner,
            "cameras": [], "alarms": []};

        // console.log(property);

        createProperty(property).then((response) => {
            console.log(response);
            window.location.href = "/properties";
        }).catch((error) => {
            console.log(error);
        });

    };

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="NewProperties">
            <Row className="w-50">
                <Button variant="danger" className="my-4 w-25 py-2" href="/properties">Go Back</Button>
                <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="PropertyCard">
                    <Row className="justify-content-center d-flex">
                        <Form>
                            <Form.Group className="mb-4" controlId="formName">
                                <Form.Label><h4><FaHouseUser/> Property Name</h4></Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Property Name" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              onChange={(e) => setName(e.target.value)}
                                              onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                      e.preventDefault()
                                                  }}}/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formOwner">
                                <Form.Label><h4><BsFillPersonFill/> Owner Username</h4></Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Owner Username" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              onChange={(e) => setOwner(e.target.value)}
                                              onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                      e.preventDefault()
                                                  }}}/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formAddress">
                                <Form.Label><h4><FaHouseUser/> Property Address</h4></Form.Label>
                                <Form.Control size="lg" as="textarea" rows={3} placeholder="Property Address" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              onChange={(e) => setAddress(e.target.value)}/>
                            </Form.Group>
                            <Button variant="danger" className="w-50 py-2" onClick={handleSubmit.bind(this)}>Save Property</Button>
                        </Form>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
}

NewProperties.propTypes = {};

NewProperties.defaultProps = {};

export default NewProperties;
