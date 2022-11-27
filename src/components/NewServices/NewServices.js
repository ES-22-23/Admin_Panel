import React, {useState} from 'react';
import './NewServices.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";
import {toast} from "react-toastify";
import SelectServices from "../SelectServices/SelectServices";
import SelectProperties from "../SelectProperties/SelectProperties";

const NewServices = () => {

    const [currentService, setCurrentService] = useState(undefined);
    const [currentProperty, setCurrentProperty] = useState(undefined);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(currentService);
        console.log(currentProperty);

        if (currentService === undefined || currentProperty === undefined) {
            toast.error("Please select a service and a property.");
        } else {
            toast.success("Service registered successfully.");
        }
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="NewServices">
            <Row className="w-75">
                <Row className="mx-0">
                    <Col className="col-5 text-start"><Button variant="danger" className="my-4 w-50 py-2" href="/services">Go Back</Button></Col>
                    <Col className="text-end">
                        <Button variant="danger" className="my-4 w-50 py-2" disabled={currentService === undefined || currentProperty === undefined}
                                onClick={handleSubmit.bind(this)}>Register Service
                        </Button>
                    </Col>
                </Row>
                <Col className="col-6">
                    <SelectServices handleSelection={setCurrentService.bind(this)}/>
                </Col>
                <Col className="col-6">
                    <SelectProperties handleSelection={setCurrentProperty.bind(this)} />
                </Col>
            </Row>
        </Container>
    );
}

NewServices.propTypes = {};

NewServices.defaultProps = {};

export default NewServices;
