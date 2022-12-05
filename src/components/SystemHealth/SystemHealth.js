import React, {useEffect} from 'react';
import './SystemHealth.css';
import {getServices} from "../../utils/ServiceRegistryHandler";
import {toast} from "react-toastify";
import {Button, Card, Col} from "react-bootstrap";
import ServiceCard from "../ServiceCard/ServiceCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {IoCloudOfflineOutline, IoCloudSharp} from "react-icons/io5";

const SystemHealth = () => {

    const [allServices, setAllServices] = React.useState([]);
    const [services, setServices] = React.useState([]);

    const [filter, setFilter] = React.useState("All");

    const [input, setInput] = React.useState("");
    const [search, setSearch] = React.useState("");

    useEffect(() => {

        getServices().then((response) => {
            setAllServices(response.data.registeredServices);
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
                            "availability": "OFFLINE",
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
                            "availability": "OFFLINE",
                            "lastTimeOnline": 1669236289649
                        }
                    },
                    {
                        "id": "23ssd8c-273a-4ety7-7a3s19dg56",
                        "componentName": "Admin Panel",
                        "healthEndpoint": "/health",
                        "componentProtocol": "HTTP",
                        "componentType": "UI",
                        "componentAddress": {
                            "id": 23,
                            "privateAddress": "10.0.10.4",
                            "publicAddress": "2.34.23.222"
                        },
                        "componentAvailability": {
                            "id": 66,
                            "availability": "OFFLINE",
                            "lastTimeOnline": 1669236289649
                        }
                    },
                    {
                        "id": "45dfs0vji4c-2ea-4ety7-7a334faa2g56",
                        "componentName": "Sites Management API",
                        "healthEndpoint": "/health",
                        "componentProtocol": "HTTP",
                        "componentType": "API",
                        "componentAddress": {
                            "id": 27,
                            "privateAddress": "10.0.10.5",
                            "publicAddress": "2.34.23.223"
                        },
                        "componentAvailability": {
                            "id": 61,
                            "availability": "OFFLINE",
                            "lastTimeOnline": 1669236289649
                        }
                    }
                ]
            };

            setAllServices(mockResponse.registeredServices);
        });
    }, []);

    useEffect(() => {
        setServices(allServices);
    },  [allServices]);

    useEffect(() => {

        // Handle Filter
        let servicesFiltered;
        if (filter === "All") {
            servicesFiltered = allServices;
        } else {
            servicesFiltered = allServices.filter(service => service.componentType === filter);
        }

        // Handle Search
        if (search !== "") {
            servicesFiltered = servicesFiltered.filter(service => service.componentName.toLowerCase().includes(search.toLowerCase()));
        }

        setServices(servicesFiltered);

    }, [filter, search]);

    const handleSearch = () => {
        setSearch(input);
    };

    let servicesPanels = [];
    for (let idx in services) {
        const service = services[idx];
        servicesPanels.push(
            <Col className="mb-4 col-lg-3 col-6" key={service.id}>
                <ServiceCard service={service} componentType={service.componentType}/>
            </Col>
        );
    }

    let onlineServices = 0;
    let offlineServices = 0;
    for (let idx in services) {
        const service = services[idx];
        if (service.componentAvailability.availability === "ONLINE") {
            onlineServices++;
        } else {
            offlineServices++;
        }
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="SystemHealth">
            <Row className="w-100">
                <Row className="justify-content-end d-flex">
                    <Col className="my-4">
                        <Card className="p-3 text-white shadow h-100 text-center" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.90)", textAlign: "start"}}>
                            <Row className="justify-content-center align-items-center d-flex h-100">
                                <Col>
                                    <IoCloudSharp size={50} />
                                    <h6><span style={{fontWeight: "bold"}}>{onlineServices}</span> Online Services</h6>
                                </Col>
                                <Col>
                                    <IoCloudOfflineOutline size={50} />
                                    <h6><span style={{fontWeight: "bold"}}>{offlineServices}</span> Offline Services</h6>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col className="col-lg-3 col-6 my-4">
                        <Card className="p-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                            <h6>Filter by <br /><span style={{fontWeight: "bold"}}>Service Category</span></h6>
                            <Form.Group className="py-2" data-testid="ServicesForm">
                                <Form.Select className="text-white" style={{backgroundColor: "rgba(0,0,0,0.80)", border: "none"}}
                                             onChange={(event) => setFilter(event.target.value)}>
                                    <option value="All">All</option>
                                    <option value="UI">UI (Frontend)</option>
                                    <option value="API">API (Backend)</option>
                                    <option value="ALARM">Alarm</option>
                                    <option value="CAMERA">Camera</option>
                                </Form.Select>
                            </Form.Group>
                        </Card>
                    </Col>
                    <Col className="col-lg-3 col-6 my-4">
                        <Card className="p-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                            <Row>
                                <Col>
                                    <h6>Search by <br /><span style={{fontWeight: "bold"}}>Service</span></h6>
                                </Col>
                                <Col>
                                    <Button className="w-100" variant="danger" onClick={handleSearch.bind(this)}>Search</Button>
                                </Col>
                            </Row>
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
                        </Card>
                    </Col>
                </Row>

                <Row className="justify-content-start d-flex">
                    {servicesPanels}
                </Row>
            </Row>
        </Container>
    );
}

SystemHealth.propTypes = {};

SystemHealth.defaultProps = {};

export default SystemHealth;
