import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Col, Form} from "react-bootstrap";
import OwnerCard from "../OwnerCard/OwnerCard";
import "./Owners.css";

const Owners = () => {

    const allOwners = [
        {"username": "Owner1", "name": "John Smith", "email": "owner1@ua.pt", "properties": []},
        {"username": "Owner2", "name": "Joahna Mary", "email": "owner2@ua.pt", "properties": []},
        {"username": "Owner3", "name": "Joahna Mary", "email": "owner2@ua.pt", "properties": []},
        {"username": "Owner4", "name": "Joahna Mary", "email": "owner2@ua.pt", "properties": []},
    ]

    const [owners, setOwners] = React.useState(allOwners);
    const [search, setSearch] = React.useState("");
    const [searchBy, setSearchBy] = React.useState("");

    const handleSearch = () => {
        // console.log(search);
        if (search !== "") {
            setOwners(allOwners.filter(owner => owner.username.toLowerCase().includes(search.toLowerCase())
                || owner.name.toLowerCase().includes(search.toLowerCase())));
        } else { setOwners(allOwners); }
        setSearchBy(search);
    };

    let ownersPanels = [];
    for (let idx in owners) {
        const owner = owners[idx]
        ownersPanels.push(
            <Col className="mb-4 col-lg-3 col-6">
                <OwnerCard owner={owner} key={owner.username}/>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Owners">
            <Row className="w-100">
                <Row className="my-4 justify-content-end d-flex">
                    <Col className="col-6">
                        <Card className="py-2 px-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.80)", textAlign: "start"}}>
                            <span>Search by: <span style={{fontWeight: "bold"}}>{searchBy}</span></span>
                        </Card>
                    </Col>
                    <Col className="col-lg-3">
                        <Form className="d-flex">
                            <Form.Control
                                id="search"
                                type="search"
                                placeholder="Search"
                                className="me-2 shadow text-white"
                                aria-label="Search"
                                style={{backgroundColor: "rgba(0,0,0,0.80)", borderRadius: "10px", border: "none"}}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleSearch();
                                    }
                                }}
                            />
                            <Button variant="danger" onClick={handleSearch.bind(this)}>Search</Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-start d-flex">
                    {ownersPanels}
                </Row></Row>
        </Container>
    );
}

Owners.propTypes = {};

Owners.defaultProps = {};

export default Owners;
