import React, {useEffect, useState} from 'react';
import './SelectServices.css';
import {Button, Card, Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {getServices} from "../../utils/ServiceRegistryHandler";
import {toast} from "react-toastify";
import {getAlarms, getCameras} from "../../utils/ApiHandler";
import {RiAlarmWarningFill} from "react-icons/ri";
import {BsCameraVideoFill, BsQuestionSquareFill} from "react-icons/bs";
import PropTypes from "prop-types";

const SelectServices = (props) => {

    const [allServices, setAllServices] = React.useState([]);
    const [services, setServices] = React.useState([]);

    const [unavailableCameras, setUnavailableCameras] = useState([]);
    const [unavailableAlarms, setUnavailableAlarms] = useState([]);

    const [currentService, setCurrentService] = useState(undefined);

    const [input, setInput] = React.useState("");
    const [search, setSearch] = React.useState("");

    useEffect(() => {

        getServices().then((response) => {

            setAllServices(response.data.registeredServices.filter(service =>
                service.componentType === "ALARM" || service.componentType === "CAMERA"));

        }).catch((error) => {
            console.log(error);
            toast.error("Unable to get Services.");

            const mockResponse = {
                "message": "Request Successful!",
                "registeredServices": [
                    {
                        "id": "36e25c8c-165a-445a-b062-9b7a16195dd6",
                        "componentName": "Camera",
                        "healthEndpoint": "/health",
                        "componentProtocol": "HTTP",
                        "componentType": "CAMERA",
                        "componentAddress": {
                            "id": 41,
                            "privateAddress": "10.0.10.2",
                            "publicAddress": "2.34.23.220"
                        },
                        "componentAvailability": {
                            "id": 61,
                            "availability": "NOT_RESPONDING",
                            "lastTimeOnline": 1669236289649
                        }
                    },
                    {
                        "id": "36e3238c-173a-4efr7-7a1619dg56",
                        "componentName": "Alarm",
                        "healthEndpoint": "/health",
                        "componentProtocol": "HTTP",
                        "componentType": "ALARM",
                        "componentAddress": {
                            "id": 42,
                            "privateAddress": "10.0.10.3",
                            "publicAddress": "2.34.23.221"
                        },
                        "componentAvailability": {
                            "id": 62,
                            "availability": "ONLINE",
                            "lastTimeOnline": 1669236289649
                        }
                    },
                ]
            };

            setAllServices(mockResponse.registeredServices.filter(service =>
                service.componentType === "ALARM" || service.componentType === "CAMERA"));
        });

        getCameras().then((response) => {
            setUnavailableCameras(response.data.map(camera => camera.id));
        }).catch((error) => {
            console.log(error);
            // toast.error("Unable to get Cameras.");
            // setUnavailableCameras(["36e25c8c-165a-445a-b062-9b7a16195dd6"]);
        });

        getAlarms().then((response) => {
            setUnavailableAlarms(response.data.map(alarm => alarm.id));
        }).catch((error) => {
            console.log(error);
            // toast.error("Unable to get Alarms.");
            // setUnavailableAlarms(["36e3238c-173a-4efr7-7a1619dg56"]);
        });
    }, []);

    useEffect(() => {
        setServices(allServices);
    }, [allServices]);

    useEffect(() => {
        if (search !== "") {
            setServices(allServices.filter(service => service.id.toLowerCase().startsWith(search.toLowerCase())
                || service.componentName.toLowerCase().includes(search.toLowerCase())));
        } else {
            setServices(allServices);
        }
    }, [search]);

    const handleSearch = () => {
        setSearch(input);
    }

    const handleClick = (service) => {
        if (props.handleSelection)
            props.handleSelection(service);
        setCurrentService(service);
    }

    let servicePanel;
    if (currentService !== undefined) {
        servicePanel =
            <Card className="p-4 mt-2 mx-0 cardItem" data-testid="SelectedService" style={{
                borderRadius: "20px",
                backgroundColor: "rgba(0,0,0,0.80)"
            }}>
                {currentService.componentType === "ALARM" &&
                    <RiAlarmWarningFill size={30}/>}
                {currentService.componentType === "CAMERA" &&
                    <BsCameraVideoFill size={30}/>}
                <span className="m-0 mt-2 cardHidden"
                      style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Component ID</span>
                <h6 className="mx-0">{currentService.id}</h6>
                <span className="m-0 cardHidden"
                      style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Component Name</span>
                <h6 className="m-0">{currentService.componentName}</h6>
            </Card>
        ;
    } else {
        servicePanel =
            <Card className="p-4 mt-2 mx-0" data-testid="SelectedService" style={{
                borderRadius: "20px",

                backgroundColor: "rgba(0,0,0,0.80)"
            }}>
                <h6 className="m-0 align-items-center d-flex"><BsQuestionSquareFill size={30} className="me-3"/> Select
                    a Device</h6>
            </Card>
        ;
    }

    let servicesPanels = [];
    for (let idx in services) {
        const service = services[idx];

        let availability;
        let isOnline = false;

        if (unavailableAlarms.includes(service.id) || unavailableCameras.includes(service.id)) {
            availability = <span style={{color: "#DC3545FF", fontSize: "80%"}}>UNAVAILABLE</span>;
        } else if (service.componentAvailability.availability === "OFFLINE") {
            availability = <span style={{color: "#DC3545FF", fontSize: "80%"}}>OFFLINE</span>;
        } else if (service.componentAvailability.availability === "NOT_RESPONDING") {
            availability = <span style={{color: "rgba(255,50,50,0.71)", fontSize: "80%"}}>NOT RESPONDING</span>;
        } else if (service.componentAvailability.availability === "ONLINE") {
            availability = <span style={{color: "#ffc400", fontSize: "80%"}}>ONLINE</span>;
            isOnline = true;
        }

        if (!isOnline) {
            servicesPanels.push(
                <Card key={idx} className="p-4 my-2 mx-0 cardItem"
                      style={{borderRadius: "20px", backgroundColor: "black", opacity: "0.7"}} >

                    {service.componentType === "ALARM" &&
                        <span className="align-items-center d-flex">
                            <RiAlarmWarningFill size={30} className="me-3" style={{color: "rgba(255,50,50,0.71)"}}/>
                            {availability}
                        </span>}
                    {service.componentType === "CAMERA" &&
                        <span className="align-items-center d-flex">
                            <BsCameraVideoFill size={30} className="me-3" style={{color: "rgba(255,50,50,0.71)"}}/>
                            {availability}
                        </span>}

                    <span className="m-0 mt-2 cardHidden"
                          style={{color: "rgba(255,50,50,0.71)", fontSize: "80%"}}>Component ID</span>
                    <h6 className="mx-0">{service.id}</h6>
                    <span className="m-0 cardHidden"
                          style={{color: "rgba(255,50,50,0.71)", fontSize: "80%"}}>Component Name</span>
                    <h6 className="m-0">{service.componentName}</h6>
                </Card>
            );
        } else {
            servicesPanels.push(
                <Card key={idx} className="p-4 my-2 mx-0 cardItem"
                      style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}
                      onClick={() => handleClick(service)}>

                    {service.componentType === "ALARM" &&
                        <span className="align-items-center d-flex">
                            <RiAlarmWarningFill size={30} className="me-3"/>
                            {availability}
                        </span>}
                    {service.componentType === "CAMERA" &&
                        <span className="align-items-center d-flex">
                            <BsCameraVideoFill size={30} className="me-3"/>
                            {availability}
                        </span>}

                    <span className="m-0 mt-2 cardHidden"
                          style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Component ID</span>
                    <h6 className="mx-0">{service.id}</h6>
                    <span className="m-0 cardHidden"
                          style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Component Name</span>
                    <h6 className="m-0">{service.componentName}</h6>
                </Card>
            );
        }
    }

    return (
        <Card className="p-5 text-white shadow" data-testid="SelectServices"
              style={{
                  border: "none",
                  borderRadius: "20px",
                  backgroundColor: "rgba(0,0,0,0.60)",
                  textAlign: "start",
                  height: "100%"
              }}>
            <Row className="justify-content-center d-flex">
                <Card className="mb-3 p-3 text-white shadow" style={{
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "rgba(0,0,0,0.60)",
                    textAlign: "start",
                }}>
                    <Row className="align-items-center d-flex">
                        <Col className="col-8">
                            <Form className="py-2" autoComplete="off">
                                <Form.Control
                                    id="search"
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 shadow text-white"
                                    aria-label="Search"
                                    style={{backgroundColor: "rgba(0,0,0,0.80)", borderRadius: "10px", border: "none"}}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            handleSearch();
                                        }
                                    }}
                                />
                            </Form>
                        </Col>
                        <Col>
                            <Button className="w-100" variant="danger" onClick={handleSearch.bind(this)}>Search</Button>
                        </Col>
                    </Row>
                </Card>
                <Row className="mx-0 mb-4 p-0 scrollable">
                    {servicesPanels}
                </Row>
            </Row>
            {servicePanel}
        </Card>
    );
}

SelectServices.propTypes = {
    /** Function to handle the selection of a service */
    handleSelection: PropTypes.func
};

SelectServices.defaultProps = {};

export default SelectServices;
