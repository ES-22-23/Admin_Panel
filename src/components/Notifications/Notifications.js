import React, {useEffect} from 'react';
import './Notifications.css';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {toast} from "react-toastify";
import IntrusionNotification from "../IntrusionNotification/IntrusionNotification";
import Form from "react-bootstrap/Form";
import {Button, Col} from "react-bootstrap";
import {IoReloadCircleSharp} from "react-icons/io5";
import {getVideos} from "../../utils/IntrusionApiHandler";

const Notifications = () => {

    const [allIntrusions, setAllIntrusions] = React.useState([]);
    const [intrusions, setIntrusions] = React.useState([]);

    const [nIntrusions, setNIntrusions] = React.useState(4);

    const [dateText, setDateText] = React.useState("");

    const obtainIntrusions = () => {

        getVideos().then((response) => {

            const responseIntrusions = response.data;
            setAllIntrusions(responseIntrusions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

        }).catch((error) => {
            console.log(error);
            toast.error("Unable to get Intrusions.");
        });
    }
    const updateIntrusions = () => {
        obtainIntrusions();
        setNIntrusions(4);
        setDateText("");
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
            setIntrusions(allIntrusions.filter((intrusion) => new Date(intrusion.timestamp).toLocaleDateString() === date));
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
                            <IoReloadCircleSharp size={40}/> Refresh
                        </h6>
                    </Col>
                    <Col className="col-lg-4 col-8 mb-3 me-3">
                        <Form className="d-flex" autoComplete="off">
                            <Form.Control className="text-white" type="date" value={dateText}
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
