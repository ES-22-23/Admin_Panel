import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './IntrusionCard.css';
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";

const IntrusionCard = (props) => {

    const [intrusion, setIntrusion] = React.useState(props.intrusion);

    useEffect(() => {
        setIntrusion(props.intrusion);
    }, [props.intrusion]);

    return (
        <Card className="p-5 text-white shadow"
              style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}
              data-testid="IntrusionCard">
            <Row className="justify-content-center align-items-center d-flex my-0">
                <Col>
                    <Card className="p-4 mx-0" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>
                        <span className="m-0" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Property ID</span>
                        <h6 className="m-0"
                            style={{lineHeight: "1.2em", minHeight: "2.4em"}}>{intrusion.propertyID}</h6>
                    </Card>
                </Col>
                <Col>
                    <Card className="p-4 mx-0" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>
                        <span className="m-0" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Camera ID</span>
                        <h6 className="m-0" style={{lineHeight: "1.2em", minHeight: "2.4em"}}>{intrusion.cameraID}</h6>
                    </Card>
                </Col>
                <Col>
                    <Card className="p-4 mx-0" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>
                        <span className="m-0" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Intrusion Date</span>
                        <h6 className="m-0"
                            style={{lineHeight: "1.2em", minHeight: "2.4em"}}>{intrusion.intrusionDate}</h6>
                    </Card>
                </Col>
                <Col className="col-3">
                    <Row className="justify-content-center d-flex">
                        <Button variant="danger" className="w-75 py-2 m-2">View Video</Button>
                        <Button variant="dark" className="w-75 py-2 m-2">Download Video</Button>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

IntrusionCard.propTypes = {
    /** Intrusion details to be displayed on the card */
    intrusion: PropTypes.object
};

IntrusionCard.defaultProps = {
    intrusion: {
        propertyID: "",
        cameraID: "",
        intrusionDate: ""
    }
};

export default IntrusionCard;
