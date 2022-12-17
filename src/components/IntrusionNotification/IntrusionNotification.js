import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './IntrusionNotification.css';
import Row from "react-bootstrap/Row";
import {Card, Col} from "react-bootstrap";

const IntrusionNotification = (props) => {

    const [intrusion, setIntrusion] = React.useState(props.intrusion);

    useEffect(() => {
        setIntrusion(props.intrusion);
    }, [props.intrusion]);

    return (
        <Card className="p-5 text-white shadow"
              style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}
              data-testid="IntrusionNotification">
            <Row className="justify-content-center align-items-center d-flex my-0">
                <Col className="col-lg-8 col-12 my-2">
                    <Card className="p-4 mx-0 w-100" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>
                        <span className="m-0" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Intrusion Detected</span>
                        <h6 className="mb-0"><span className="m-0" style={{fontSize: "80%"}}>
                            Property ID:</span> {intrusion.propertyID}</h6>
                        <h6 className="m-0"><span className="m-0" style={{fontSize: "80%"}}>
                            Camera ID:</span> {intrusion.cameraID}</h6>
                    </Card>
                </Col>
                <Col className="my-2">
                    <Card className="p-4 mx-0 w-100" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>
                        <span className="m-0" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Intrusion Date</span>
                        <h6 className="m-0"
                            style={{lineHeight: "1.2em", minHeight: "2.4em"}}>{new Date(intrusion.timestamp).toLocaleString()}</h6>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}

IntrusionNotification.propTypes = {
    /** Intrusion details to be displayed on the card */
    intrusion: PropTypes.object,
};

IntrusionNotification.defaultProps = {
    intrusion: null,
};

export default IntrusionNotification;
