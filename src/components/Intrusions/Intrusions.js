import React, {useEffect} from 'react';
import './Intrusions.css';
import {getVideos} from "../../utils/ApiHandler";
import Container from "react-bootstrap/Container";

const Intrusions = () => {

    const [allIntrusions, setAllIntrusions] = React.useState([]);
    const [intrusions, setIntrusions] = React.useState([]);

    const convertKey = (key) => {
        const items = key.split('/');

        const propertyId = items[0].replace('propId', '');
        const cameraId = items[1].replace('cam', '');
        const date = items[2].replace('Video', '');

        return {"propertyID": propertyId, "cameraID": cameraId, "Date": new Date(date).toLocaleString};
    }

    useEffect(() => {
        getVideos().then((response) => {
            setAllIntrusions(response.data);
        }).catch((error) => {
            console.log(error);

            const mockResponse = [
                "propId2/cam36e25c8c-165a-445a-b062-9b7a16195dd6/Video2022-11-28 03:38:09.845474"
            ];

            const mockIntrusions = [];
            for (let idx in mockResponse) {
                mockIntrusions.push(convertKey(mockResponse[idx]));
            }

            setAllIntrusions(mockIntrusions);
        });
    }, []);

    useEffect(() => {
        setIntrusions(allIntrusions);
    }, [allIntrusions]);


    console.log(intrusions);
    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Intrusions">

        </Container>
    );
};

Intrusions.propTypes = {};

Intrusions.defaultProps = {};

export default Intrusions;
