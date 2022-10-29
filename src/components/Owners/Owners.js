import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";
import {MdFingerprint} from "react-icons/md";

const Owners = () => {

    const [hidden, setHidden] = React.useState(true);

    const owners = [
        {"username": "Owner1", "name": "John Smith", "email": "owner1@ua.pt", "properties": []},
        {"username": "Owner2", "name": "Joahna Mary", "email": "owner2@ua.pt", "properties": []},
        {"username": "Owner2", "name": "Joahna Mary", "email": "owner2@ua.pt", "properties": []},
        {"username": "Owner2", "name": "Joahna Mary", "email": "owner2@ua.pt", "properties": []},
    ]

    let ownersPanels = [];
    for (let idx in owners) {
        const owner = owners[idx]
        ownersPanels.push(
            <Col className="mb-4 col-lg-3 col-6">
                <Card className="p-5 text-white" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                    <Row className="justify-content-center d-flex">
                        <MdFingerprint size={50}/>
                        <Row className="p-0">
                            <h6 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{owner.name}</h6>
                        </Row>
                        <Row className="p-0" hidden={hidden}>
                            <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{owner.username}</h6>
                            <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{owner.email}</h6>
                        </Row>
                    </Row>
                    <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}} onClick={()=> setHidden(!hidden)}>View Details</Button>
                    <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}}>View Properties</Button>
                </Card>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Owners">
            <Row className="mt-4">
                {ownersPanels}
            </Row>
        </Container>
    );
}

Owners.propTypes = {};

Owners.defaultProps = {};

export default Owners;
