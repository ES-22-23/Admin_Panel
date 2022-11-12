import React from 'react';
import './NewProperties.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Form} from "react-bootstrap";
import {BsFillPersonFill} from "react-icons/bs";
import {FaHouseUser} from "react-icons/fa";
import {createProperty, getOwner} from "../../utils/ApiHandler";
import {toast} from "react-toastify";
import AutoComplete from "../AutoComplete/AutoComplete";

const NewProperties = () => {

    const [name, setName] = React.useState("");
    const [owner, setOwner] = React.useState("");
    const [address, setAddress] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const property = {"name": name, "address": address, "owner": owner,
            "cameras": [], "alarms": []};

        // console.log(property);

        if (name === "" || owner === "" || address === "") {
            toast.error("Please fill in all fields.");
        } else {
            getOwner(owner).then((response) => {
                console.log(response);
                createProperty(property).then((response) => {
                    console.log(response);
                    window.location.href = "/properties";
                }).catch((error) => {
                    console.log(error);
                    toast.error("Unable to create property.");
                });
            }).catch((error) => {
                console.log(error);
                toast.error("Owner not found.");
            });
        }
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
                                                  }}}
                                              autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formOwner">
                                <Form.Label><h4><BsFillPersonFill/> Owner Username</h4></Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Owner Username" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              value={owner}
                                              onChange={(e) => setOwner(e.target.value)}
                                              onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                      e.preventDefault()
                                                  }}}
                                              autoComplete="off"/>
                            </Form.Group>
                            <AutoComplete input={owner} handleAutocomplete={(username) => setOwner(username)}/>
                            <Form.Group className="my-4" controlId="formAddress">
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
