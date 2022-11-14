import React from 'react';
import './NewOwners.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Form} from "react-bootstrap";
import {BsEnvelopeFill, BsFillPersonCheckFill, BsFillPersonLinesFill} from "react-icons/bs";
import {toast} from "react-toastify";
import {createOwner} from "../../utils/ApiHandler";

const NewOwners = () => {

    const [username, setUsername] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const owner = {"name": name, "username": username, "email": email};

        // console.log(owner);

        if (username === "" || name === "" || email === "") {
            toast.error("Please fill in all fields.");
        } else {
            createOwner(owner).then((response) => {
                console.log(response);
                window.location.href = "/owners";
            }).catch((error) => {
                console.log(error);
                toast.error("Unable to create owner.");
            });
        }
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="NewOwners">
            <Row className="w-50">
                <Button variant="danger" className="my-4 w-25 py-2" href="/owners">Go Back</Button>
                <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="PropertyCard">
                    <Row className="justify-content-center d-flex">
                        <Form>
                            <Form.Group className="mb-4" controlId="formName">
                                <Form.Label><h4><BsFillPersonLinesFill/> Full Name</h4></Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Name" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              onChange={(e) => setName(e.target.value)}
                                              onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                      e.preventDefault()
                                                  }}}
                                              autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formUsername">
                                <Form.Label><h4><BsFillPersonCheckFill/> Owner Username</h4></Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Username" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              onChange={(e) => setUsername(e.target.value)}
                                              onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                      e.preventDefault()
                                                  }}}
                                              autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="my-4" controlId="formEmail">
                                <Form.Label><h4><BsEnvelopeFill/> Email</h4></Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Email" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Button variant="danger" className="w-50 py-2" onClick={handleSubmit.bind(this)}>Save Owner</Button>
                        </Form>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
};

NewOwners.propTypes = {};

NewOwners.defaultProps = {};

export default NewOwners;
