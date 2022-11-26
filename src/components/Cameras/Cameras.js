import React, {useEffect} from 'react';
import './Cameras.css';
import {getServices} from "../../utils/ServiceRegistryHandler";
import {toast} from "react-toastify";
import {Col} from "react-bootstrap";
import ServiceCard from "../ServiceCard/ServiceCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SearchBar from "../SearchBar/SearchBar";

const Cameras = () => {

    const [allCameras, setAllCameras] = React.useState([]);
    const [cameras, setCameras] = React.useState([]);

    useEffect(() => {
        getServices().then((response) => {
            // Filter by Cameras
            setAllCameras(response.data.filter(service => service.componentType === "CAMERA"));

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
                    }
                ]
            };

            setAllCameras(mockResponse.registeredServices.filter(service => service.componentType === "CAMERA"));
        });
    }, []);

    useEffect(() => {
        setCameras(allCameras);
    },  [allCameras]);

    const handleSearch = (search) => {
        if (search !== "") {
            setCameras(allCameras.filter(camera => camera.id.toLowerCase().startsWith(search.toLowerCase())
                || camera.componentName.toLowerCase().includes(search.toLowerCase())));
        } else {
            setCameras(allCameras);
        }
    };

    let camerasPanels = [];
    for (let idx in cameras) {
        const camera = cameras[idx];
        camerasPanels.push(
            <Col className="mb-4 col-lg-3 col-6" key={camera.id}>
                <ServiceCard service={camera} componentType={camera.componentType}/>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Cameras">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)}/>

                <Row className="justify-content-start d-flex">
                    {camerasPanels}
                </Row>
            </Row>
        </Container>
    );
}

Cameras.propTypes = {};

Cameras.defaultProps = {};

export default Cameras;
