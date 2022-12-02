import React, {useEffect} from 'react';
import './Intrusions.css';
import {getVideos} from "../../utils/ApiHandler";
import Container from "react-bootstrap/Container";
import IntrusionCard from "../IntrusionCard/IntrusionCard";
import SearchBar from "../SearchBar/SearchBar";
import Row from "react-bootstrap/Row";
import VideoModal from "../VideoModal/VideoModal";

const Intrusions = () => {

    const [allIntrusions, setAllIntrusions] = React.useState([]);
    const [intrusions, setIntrusions] = React.useState([]);

    const [selectedIntrusion, setSelectedIntrusion] = React.useState(null);

    const convertKey = (key) => {
        const items = key.split('/');

        const propertyId = items[0].replace('propId', '');
        const cameraId = items[1].replace('cam', '');
        const date = items[2].replace('Video', '');

        return {"key": key, "propertyID": propertyId, "cameraID": cameraId, "intrusionDate": new Date(date).toLocaleString()};
    }

    useEffect(() => {
        getVideos().then((response) => {

            const responseIntrusions = response.data;
            const currentIntrusions = [];

            for (let idx in responseIntrusions) {
                currentIntrusions.push(convertKey(idx));
            }

            setAllIntrusions(currentIntrusions.sort((a, b) => new Date(b.intrusionDate) - new Date(a.intrusionDate)));

        }).catch((error) => {
            console.log(error);

            const mockResponse = [
                "propId2/cam36e25c8c-165a-445a-b062-9b7a16195dd6/Video2022-11-28 03:38:09.845474",
                "propId3/cam2b034ras-23-b062-9b7a16195dd6/Video2022-11-30 05:41:09.845474"
            ];

            const mockIntrusions = [];
            for (let idx in mockResponse) {
                mockIntrusions.push(convertKey(mockResponse[idx]));
            }

            setAllIntrusions(mockIntrusions.sort((a, b) => new Date(b.intrusionDate) - new Date(a.intrusionDate)));
        });
    }, []);

    useEffect(() => {
        setIntrusions(allIntrusions);
    }, [allIntrusions]);

    const handleSearch = (search) => {
        if (search !== "") {
            setIntrusions(allIntrusions.filter(intrusion => intrusion.propertyID.toLowerCase().startsWith(search.toLowerCase())
                || intrusion.cameraID.toLowerCase().startsWith(search.toLowerCase())));
        } else { setIntrusions(allIntrusions); }
    }

    const handleSelection = (intrusion) => {
        setSelectedIntrusion(intrusion);
    }

    let intrusionsPanels = [];
    for (let idx in intrusions) {
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

                {selectedIntrusion !== null &&
                    <VideoModal intrusion={selectedIntrusion} handleClose={() => setSelectedIntrusion(null)} />
                }
            </Row>
        </Container>
    );
};

Intrusions.propTypes = {};

Intrusions.defaultProps = {};

export default Intrusions;
