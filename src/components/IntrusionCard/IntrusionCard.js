import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './IntrusionCard.css';
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";
import {toast} from "react-toastify";
import {getVideoUrl} from "../../utils/IntrusionApiHandler";

const IntrusionCard = (props) => {

    const [intrusion, setIntrusion] = React.useState(props.intrusion);
    const [videoUrl, setVideoUrl] = React.useState(undefined);

    useEffect(() => {

        if (props.intrusion) {
            setIntrusion(props.intrusion);

            getVideoUrl(intrusion.id).then((response) => {
                setVideoUrl(response.data);
            }).catch((error) => {
                // console.log(error);
                toast.error("Unable to get Video.");
            });
        }

    }, [props.intrusion]);

    const handleSelection = () => {
        props.handleSelection(intrusion);
    }

    const handleDownload = () => {
        // Opens a new tab with the video
        window.open(videoUrl);
    }

    if (!intrusion) {
        return <div data-testid="IntrusionCard"></div>;
    }

    return (
        <Card className="p-5 text-white shadow"
              style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}
              data-testid="IntrusionCard">
            <Row className="justify-content-center align-items-center d-flex my-0">
                <Col className="col-lg-3 col-6 my-2">
                    <Card className="p-4 mx-0" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>
                        <span className="m-0" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Property ID</span>
                        <h6 className="m-0"
                            style={{lineHeight: "1.2em", minHeight: "2.4em"}}>{intrusion.propertyID}</h6>
                    </Card>
                </Col>
                <Col className="col-lg-3 col-6 my-2">
                    <Card className="p-4 mx-0" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>
                        <span className="m-0" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Camera ID</span>
                        <h6 className="m-0" style={{lineHeight: "1.2em", minHeight: "2.4em"}}>{intrusion.cameraID}</h6>
                    </Card>
                </Col>
                <Col className="col-lg-3 col-6 my-2">
                    <Card className="p-4 mx-0" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>
                        <span className="m-0" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Intrusion Date</span>
                        <h6 className="m-0"
                            style={{
                                lineHeight: "1.2em",
                                minHeight: "2.4em"
                            }}>{new Date(intrusion.timestamp).toLocaleString()}</h6>
                    </Card>
                </Col>
                <Col className="col-lg-3 col-6 my-2">
                    <Row className="justify-content-center d-flex">
                        <Button variant="danger" className="w-75 py-2 m-2" onClick={handleSelection} disabled={!videoUrl}>
                            View Video</Button>
                        <Button variant="dark" className="w-75 py-2 m-2" onClick={handleDownload} disabled={!videoUrl}>
                            Download Video</Button>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

IntrusionCard.propTypes = {
    /** Intrusion details to be displayed on the card */
    intrusion: PropTypes.object,
    /** Function to be called when the View Video button is clicked */
    handleSelection: PropTypes.func
};

IntrusionCard.defaultProps = {
    intrusion: null,
    handleSelection: () => {
    }
};

export default IntrusionCard;
