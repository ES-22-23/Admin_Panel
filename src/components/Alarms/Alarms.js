import React, {useEffect} from 'react';
import './Alarms.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SearchBar from "../SearchBar/SearchBar";
import {Col} from "react-bootstrap";
import {getServices} from "../../utils/ServiceRegistryHandler";
import {toast} from "react-toastify";
import ServiceCard from "../ServiceCard/ServiceCard";

const Alarms = () => {

    const [allAlarms, setAllAlarms] = React.useState([]);
    const [alarms, setAlarms] = React.useState([]);

    useEffect(() => {
        getServices().then((response) => {
            // Filter by Alarms
            setAllAlarms(response.data.filter(service => service.componentType === "ALARM"));

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

            setAllAlarms(mockResponse.registeredServices.filter(service => service.componentType === "ALARM"));
        });
    }, []);

    useEffect(() => {
        setAlarms(allAlarms);
    },  [allAlarms]);

    const handleSearch = (search) => {
        if (search !== "") {
            setAlarms(allAlarms.filter(alarm => alarm.id.toLowerCase().startsWith(search.toLowerCase())
                || alarm.componentName.toLowerCase().includes(search.toLowerCase())));
        } else {
            setAlarms(allAlarms);
        }
    };

    let alarmsPanels = [];
    for (let idx in alarms) {
        const alarm = alarms[idx];
        alarmsPanels.push(
            <Col className="mb-4 col-lg-3 col-6" key={alarm.id}>
                <ServiceCard service={alarm} componentType={alarm.componentType}/>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Alarms">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)}/>

                <Row className="justify-content-start d-flex">
                    {alarmsPanels}
                </Row>
            </Row>
        </Container>
    );
}

Alarms.propTypes = {};

Alarms.defaultProps = {};

export default Alarms;
