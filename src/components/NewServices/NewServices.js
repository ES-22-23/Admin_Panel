import React, {useState} from 'react';
import './NewServices.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";
import {toast} from "react-toastify";
import SelectServices from "../SelectServices/SelectServices";
import SelectProperties from "../SelectProperties/SelectProperties";
import {createAlarm, createCamera} from "../../utils/ApiHandler";

const NewServices = () => {

    const [currentService, setCurrentService] = useState(undefined);
    const [currentProperty, setCurrentProperty] = useState(undefined);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (currentService === undefined || currentProperty === undefined) {
            toast.error("Please select a service and a property.");
        } else {
            if (currentService.componentType === "CAMERA") {
                const camera = {"id": currentService.id, "propertyName": currentProperty.name, "propertyAddress": currentProperty.address};
                console.log(camera);
                createCamera(camera).then(() => {
                    toast.success("Camera created successfully.");
                    setTimeout(() => { window.location.href = "/services"; }, 2000);
                }).catch((error) => {
                    console.log(error);
                    toast.error("Error creating camera.");
                });
            } else if (currentService.componentType === "ALARM") {
                const alarm = {"privateId": currentService.id, "propertyName": currentProperty.name, "propertyAddress": currentProperty.address};
                createAlarm(alarm).then(() => {
                    toast.success("Alarm created successfully.");
                    setTimeout(() => { window.location.href = "/services"; }, 2000);
                }).catch((error) => {
                    console.log(error);
                    toast.error("Error creating alarm.");
                });
            }
        }
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="NewServices">
            <Row className="w-75">
                <Row className="mx-0">
                    <Col className="col-lg-2 col-4 text-start"><Button variant="danger" className="my-4 w-100 py-2" href="/services">Go Back</Button></Col>
                    <Col className="col-lg-4">
                        <Button variant="danger" className="my-4 w-100 py-2" disabled={currentService === undefined || currentProperty === undefined}
                                onClick={handleSubmit.bind(this)}>Register Service
                        </Button>
                    </Col>
                </Row>
                <Col className="col-lg-6 col-12 my-2">
                    <SelectServices handleSelection={setCurrentService.bind(this)}/>
                </Col>
                <Col className="col-lg-6 col-12 my-2">
                    <SelectProperties handleSelection={setCurrentProperty.bind(this)} />
                </Col>
            </Row>
        </Container>
    );
}

NewServices.propTypes = {};

NewServices.defaultProps = {};

export default NewServices;
