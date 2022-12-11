import React, {useEffect} from 'react';
import './Notifications.css';
import {getVideos} from "../../utils/ApiHandler";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {toast} from "react-toastify";
import IntrusionNotification from "../IntrusionNotification/IntrusionNotification";
import Form from "react-bootstrap/Form";
import {Button, Col} from "react-bootstrap";
import {IoReloadCircleSharp} from "react-icons/io5";

const Notifications = () => {

    const [allIntrusions, setAllIntrusions] = React.useState([]);
    const [intrusions, setIntrusions] = React.useState([]);

    const [nIntrusions, setNIntrusions] = React.useState(4);

    const [dateText, setDateText] = React.useState("");
    const convertKey = (key) => {

        key = key.replace('.mp4', '');
        const items = key.split('/');

        const propertyId = items[0].replace('propId', '');
        const cameraId = items[1].replace('cam', '');
        const date = items[2].replace('Video', '');

        return {
            "key": key,
            "propertyID": propertyId,
            "cameraID": cameraId,
            "intrusionDate": new Date(date)
        };
    }
    const obtainIntrusions = () => {

        getVideos().then((response) => {

            const responseIntrusions = response.data;
            const currentIntrusions = [];

            for (let idx in responseIntrusions) {
                const intrusion = responseIntrusions[idx];
                currentIntrusions.push(convertKey(intrusion));
            }

            setAllIntrusions(currentIntrusions.sort((a, b) => new Date(b.intrusionDate) - new Date(a.intrusionDate)));

        }).catch((error) => {
            console.log(error);
            toast.error("Error fetching intrusions.");

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
    }
    const updateIntrusions = () => {
        obtainIntrusions();
        setNIntrusions(4);
        toast.info("Intrusions updated.");
    }

    useEffect(() => {
        obtainIntrusions();
    }, []);

    useEffect(() => {
        setIntrusions(allIntrusions);
    }, [allIntrusions]);

    useEffect(() => {
        if (dateText === "") {
            setIntrusions(allIntrusions);
        } else {
            const date = new Date(dateText).toLocaleDateString();
            setIntrusions(allIntrusions.filter((intrusion) => intrusion.intrusionDate.toLocaleDateString() === date));
        }
    }, [dateText]);

    let intrusionsPanels = [];
    for (let idx in intrusions) {

        if (idx >= nIntrusions) {
            break;
        }

        const intrusion = intrusions[idx];
        intrusionsPanels.push(
            <Row className="my-2" key={intrusion.key}>
                <IntrusionNotification intrusion={intrusion}/>
            </Row>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Notifications">
            <Row className="w-100">
                <Row className="justify-content-center d-flex">
                    <Col className="text-start">
                        <h6 style={{cursor: "pointer"}} onClick={() => updateIntrusions()}>
                            <IoReloadCircleSharp size={40}/> Refresh</h6>
                    </Col>
                    <Col className="col-lg-4 col-8 mb-3 me-3">
                        <Form className="d-flex" autoComplete="off">
                            <Form.Control className="text-white" type="date"
                                          style={{border: "none", backgroundColor: "rgba(0,0,0,0.80)"}}
                                          onChange={(e) => {setDateText(e.target.value); setNIntrusions(4);}}
                            />
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-start d-flex">
                    {intrusionsPanels}
                </Row>
                {intrusions.length > nIntrusions &&
                    <Row className="justify-content-start d-flex mt-2">
                        <Col>
                            <Button className="mt-3 w-25" variant="danger" onClick={() => setNIntrusions(nIntrusions + 4)}>
                                Load more
                            </Button>
                        </Col>
                    </Row>
                }
            </Row>
        </Container>
    );
}

Notifications.propTypes = {};

Notifications.defaultProps = {};

export default Notifications;
