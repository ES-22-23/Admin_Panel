import React, {useEffect} from 'react';
import './Intrusions.css';
import Container from "react-bootstrap/Container";
import IntrusionCard from "../IntrusionCard/IntrusionCard";
import SearchBar from "../SearchBar/SearchBar";
import Row from "react-bootstrap/Row";
import VideoModal from "../VideoModal/VideoModal";
import {toast} from "react-toastify";
import {Button, Col} from "react-bootstrap";
import {getVideos} from "../../utils/IntrusionApiHandler";

const Intrusions = () => {

    const [allIntrusions, setAllIntrusions] = React.useState([]);
    const [intrusions, setIntrusions] = React.useState([]);

    const [selectedIntrusion, setSelectedIntrusion] = React.useState(null);

    const [nIntrusions, setNIntrusions] = React.useState(4);

    useEffect(() => {

        getVideos().then((response) => {

            const responseIntrusions = response.data;
            setAllIntrusions(responseIntrusions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

        }).catch((error) => {
            console.log(error);
            toast.error("Error fetching intrusions.");

            const mockResponse = [
                {
                    "id": 1,
                    "propertyID": 2,
                    "cameraID": "36e25c8c-165a-445a-b062-9b7a16195dd6",
                    "timestamp": "2022-11-28 03:38:09.845474",
                    "videoKey": "propId2/cam36e25c8c-165a-445a-b062-9b7a16195dd6/Video2022-11-28 03:38:09.845474"
                },
                {
                    "id": 2,
                    "propertyID": 3,
                    "cameraID": "2b034ras-23-b062-9b7a16195dd6",
                    "timestamp": "2022-11-30 05:41:09.845474",
                    "videoKey": "propId3/cam2b034ras-23-b062-9b7a16195dd6/Video2022-11-30 05:41:09.845474"
                }
            ];

            setAllIntrusions(mockResponse.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

        });
    }, []);

    useEffect(() => {
        setIntrusions(allIntrusions);
    }, [allIntrusions]);

    const handleSearch = (search) => {
        if (search !== "") {
            setIntrusions(allIntrusions.filter(intrusion => intrusion.propertyID.toLowerCase().startsWith(search.toLowerCase())
                || intrusion.cameraID.toLowerCase().startsWith(search.toLowerCase())));
        } else {
            setIntrusions(allIntrusions);
        }
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
            <Row className="my-2" key={intrusion.key}>
                <IntrusionCard intrusion={intrusion} handleSelection={handleSelection.bind(this)}/>
            </Row>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Intrusions">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)}/>

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
