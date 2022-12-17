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
