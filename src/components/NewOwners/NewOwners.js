import React, {useEffect} from 'react';
import './NewOwners.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Col, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {createOwner} from "../../utils/ApiHandler";
import {getUsers, registerUser} from "../../utils/KeycloakHandler";

const NewOwners = () => {

    const [username, setUsername] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // const [users, setUsers] = React.useState([]);

    useEffect(() => {
        getUsers().then(response => {
            setUsers(response.data);
        });
    }, []);

    /*
    const obtainUserID = (username) => {
        let id = "";
        users.forEach(user => {
            console.log(user);
            if (user.username.toLowerCase() === username.toLowerCase()) {
                id = user.id;
            }
        });
        return id;
    }*/

    const handleSubmit = (event) => {
        event.preventDefault();
        const owner = {"name": firstName + " " + lastName, "username": username, "email": email};
        const user = {"firstName": firstName, "lastName": lastName, "username": username, "email": email, "enabled": true,
            "credentials": [
                {"type": "password", "value": password, "temporary": false}
            ]};

        if (username === "" || firstName === "" || lastName === "" || password === "" || email === "") {
            toast.error("Please fill in all fields.");
        } else {

            registerUser(user).then((response) => {

                // Keycloak will return a 201 Created HTTP response,
                // along with the details of the newly created user in the response body.

                if (response.status === 201) {

                    createOwner(owner).then(() => {
                        toast.success("Owner created successfully.");
                        setTimeout(() => {
                            window.location.href = "/owners";
                        }, 2000);

                    }).catch((error) => {
                        console.log(error);
                        toast.error("Unable to create Owner.");
                    });
                }

            }).catch((error) => {
                console.log(error);
                toast.error("Unable to create User.");

                if (error.response.status === 400) {
                    toast.error("Missing required parameters or invalid provided credentials.")

                } else if (error.response.status === 409) {
                    toast.error("User already exists.");
                }
            });
        }
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="NewOwners">
            <Row className="w-50">
                <Button variant="danger" className="my-4 w-25 py-2" href="/owners">Go Back</Button>
                <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                    <Row className="justify-content-center d-flex">
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-4" controlId="formFirstName">
                                        <Form.Label><h4>First Name</h4></Form.Label>
                                        <Form.Control size="lg" type="text" placeholder="First Name" className="text-white"
                                                      style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                                      onChange={(e) => setFirstName(e.target.value)}
                                                      onKeyDown={(e) => {
                                                          if (e.key === 'Enter') {
                                                              e.preventDefault()
                                                          }}}
                                                      autoComplete="off"/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4" controlId="formLastName">
                                        <Form.Label><h4>Last Name</h4></Form.Label>
                                        <Form.Control size="lg" type="text" placeholder="Last Name" className="text-white"
                                                      style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                                      onChange={(e) => setLastName(e.target.value)}
                                                      onKeyDown={(e) => {
                                                          if (e.key === 'Enter') {
                                                              e.preventDefault()
                                                          }}}
                                                      autoComplete="off"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-4" controlId="formUsername">
                                <Form.Label><h4>Owner Username</h4></Form.Label>
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
                                <Form.Label><h4>Email</h4></Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Email" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formUsername">
                                <Form.Label><h4>Password</h4></Form.Label>
                                <Form.Control size="lg" type="password" placeholder="Password" className="text-white"
                                              style={{backgroundColor: "rgba(0,0,0,0.60)", border: "none"}}
                                              onChange={(e) => setPassword(e.target.value)}
                                              onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                      e.preventDefault()
                                                  }}}
                                              autoComplete="off"/>
                            </Form.Group>
                            <Button variant="danger" className="w-50 py-2" onClick={handleSubmit.bind(this)}>Register Owner</Button>
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
