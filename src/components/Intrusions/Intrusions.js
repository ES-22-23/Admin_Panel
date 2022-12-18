import React, {useEffect, useState} from 'react';
import './Intrusions.css';
import Container from "react-bootstrap/Container";
import IntrusionCard from "../IntrusionCard/IntrusionCard";
import Row from "react-bootstrap/Row";
import VideoModal from "../VideoModal/VideoModal";
import {toast} from "react-toastify";
import {Button, Card, Col} from "react-bootstrap";
import {getVideos} from "../../utils/IntrusionApiHandler";
import {RiErrorWarningFill, RiErrorWarningLine} from "react-icons/ri";
import Form from "react-bootstrap/Form";

const Intrusions = () => {

    const [allIntrusions, setAllIntrusions] = React.useState([]);
    const [intrusions, setIntrusions] = React.useState([]);

    const [selectedIntrusion, setSelectedIntrusion] = React.useState(null);

    const [nIntrusions, setNIntrusions] = React.useState(4);

    const [cameraInput, setCameraInput] = useState("");
    const [propertyInput, setPropertyInput] = useState("");

    useEffect(() => {

        getVideos().then((response) => {

            const responseIntrusions = response.data;
            setAllIntrusions(responseIntrusions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

        }).catch((error) => {
            console.log(error);
            toast.error("Unable to get Intrusions.");
        });
    }, []);

    useEffect(() => {
        setIntrusions(allIntrusions);
    }, [allIntrusions]);

    const handleSearch = () => {

        let filteredIntrusions = allIntrusions;

        if (cameraInput !== "")
            filteredIntrusions = filteredIntrusions.filter(intrusion => intrusion.cameraId.toLowerCase().startsWith(cameraInput.toLowerCase()));
        if (propertyInput !== "")
            filteredIntrusions = filteredIntrusions.filter(intrusion => intrusion.propertyId.toString().startsWith(propertyInput.toLowerCase()));

        if (cameraInput === "" && propertyInput === "") {
            setIntrusions(allIntrusions);
        }

        setIntrusions(filteredIntrusions);
        setNIntrusions(4);
    }

    const handleSelection = (intrusion) => {
        setSelectedIntrusion(intrusion);
    }

    let intrusionsPanels = [];
    for (let idx in intrusions) {
        if (idx >= nIntrusions) {
            break;
        }

        const intrusion = intrusions[idx];
        intrusionsPanels.push(
            <Row className="my-2 mx-0" key={intrusion.key}>
                <IntrusionCard intrusion={intrusion} handleSelection={handleSelection.bind(this)}/>
            </Row>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Intrusions">
            <Row className="w-100">
                <Row className="justify-content-end d-flex">
                    <Col className="col-lg-6 col-12 my-4">
                        <Card className="p-3 text-white shadow h-100 text-center" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.90)", textAlign: "start"}}>
                            <Row className="justify-content-center align-items-center d-flex h-100">
                                <Col>
                                    <RiErrorWarningFill size={50} />
                                    <h6 data-testid="NumberOfIntrusions"><span style={{fontWeight: "bold"}}>{intrusions.length}</span> Intrusions</h6>
                                </Col>
                                <Col>
                                    <RiErrorWarningLine size={50} />
                                    <h6 data-testid="NumberOfTotalIntrusions"><span style={{fontWeight: "bold"}}>{allIntrusions.length}</span> Total Intrusions</h6>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col className="col-lg-3 col-6 my-4">
                        <Card className="p-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                            <Row>
                                <Col>
                                    <h6>Search by <br /><span style={{fontWeight: "bold"}}>Property ID</span></h6>
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
                                    onChange={(e) => setPropertyInput(e.target.value)}
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
                    <Col className="col-lg-3 col-6 my-4">
                        <Card className="p-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                            <Row>
                                <Col>
                                    <h6>Search by <br /><span style={{fontWeight: "bold"}}>Camera ID</span></h6>
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
                                    onChange={(e) => setCameraInput(e.target.value)}
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
                    {intrusionsPanels}
                </Row>

                {intrusions.length > nIntrusions &&
                    <Row className="justify-content-start d-flex mt-2">
                        <Col>
                            <Button className="mt-3 w-25" variant="danger"
                                    onClick={() => setNIntrusions(nIntrusions + 4)}>
                                Load more
                            </Button>
                        </Col>
                    </Row>
                }

                {selectedIntrusion !== null &&
                    <VideoModal intrusion={selectedIntrusion} handleClose={() => setSelectedIntrusion(null)}/>
                }
            </Row>
        </Container>
    );
};

Intrusions.propTypes = {};

Intrusions.defaultProps = {};

export default Intrusions;
