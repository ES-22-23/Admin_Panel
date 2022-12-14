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
                setAllServices(response.data.registeredServices.filter(service =>
                    service.componentType === "ALARM" || service.componentType === "CAMERA"));

        }).catch((error) => {
            console.log(error);
            toast.error("Unable to get Services.");
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
                <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/services" addNewText="Device"
                placeholder="[ID, Name]"/>

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
