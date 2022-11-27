import React, {useEffect} from 'react';
import './Services.css';
import {getServices} from "../../utils/ServiceRegistryHandler";
import {toast} from "react-toastify";
import {Col} from "react-bootstrap";
import ServiceCard from "../ServiceCard/ServiceCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SearchBar from "../SearchBar/SearchBar";
import {useParams} from "react-router-dom";

const Services = () => {

    const { componentType } = useParams();

    const [allServices, setAllServices] = React.useState([]);
    const [services, setServices] = React.useState([]);

    useEffect(() => {

        let currentType;
        if (componentType === "alarms")
            currentType = "ALARM";
        else if (componentType === "cameras")
            currentType = "CAMERA";

        getServices().then((response) => {

            // Filter Services
            if (currentType)
                setAllServices(response.data.registeredServices.filter(service => service.componentType === currentType));
            else
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
                        "componentName": "Service",
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
                    }
                ]
            };

            if (componentType)
                setAllServices(mockResponse.registeredServices.filter(service => service.componentType === currentType));
            else
                setAllServices(mockResponse.registeredServices);
        });
    }, []);

    useEffect(() => {
        setServices(allServices);
    },  [allServices]);

    const handleSearch = (search) => {
        if (search !== "") {
            setServices(allServices.filter(service => service.id.toLowerCase().startsWith(search.toLowerCase())
                || service.componentName.toLowerCase().includes(search.toLowerCase())));
        } else {
            setServices(allServices);
        }
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

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Services">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/services"/>

                <Row className="justify-content-start d-flex">
                    {servicesPanels}
                </Row>
            </Row>
        </Container>
    );

}
Services.propTypes = {};

Services.defaultProps = {};

export default Services;
