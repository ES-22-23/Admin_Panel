import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Row from "react-bootstrap/Row";
import {FaHouseUser} from "react-icons/fa";
import {Button, Card, Col} from "react-bootstrap";
import {RiAlarmWarningFill} from "react-icons/ri";
import {BsCameraVideoFill} from "react-icons/bs";

const PropertyCard = (props) => {

    const property = props.property;

    const [alarmsHidden, setAlarmsHidden] = React.useState(true);
    const [camerasHidden, setCamerasHidden] = React.useState(true);

    const [alarmsPanels, setAlarmsPanels] = React.useState([]);
    const [camerasPanels, setCamerasPanels] = React.useState([]);

    const handleViewAlarms = () => {
        setAlarmsHidden(!alarmsHidden);
    }

    const handleViewCameras = () => {
        setCamerasHidden(!camerasHidden);
    }

    useEffect(() => {
        let alarms = [];
        if (!alarmsHidden) {
            for (let idx in property.alarms) {
                const alarm = property.alarms[idx];
                alarms.push(
                    <Row className="p-0 m-0 align-items-center d-flex" key={alarm.id}>
                        <Col className="col-3"><RiAlarmWarningFill size={40}/></Col>
                        <Col><h6 className="p-4 mt-1 mx-2"
                                 style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{alarm.id}</h6>
                        </Col>
                    </Row>
                )
            }
        }
        setAlarmsPanels(alarms);
    }, [alarmsHidden, property.alarms]);

    useEffect(() => {
        let cameras = [];
        if (!camerasHidden) {
            for (let idx in property.cameras) {
                const camera = property.cameras[idx];
                cameras.push(
                    <Row className="p-0 m-0 align-items-center d-flex" key={camera.id}>
                        <Col className="col-3"><BsCameraVideoFill size={40}/></Col>
                        <Col><h6 className="p-4 mt-1 mx-2"
                                 style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{camera.id}</h6>
                        </Col>
                    </Row>
                )
            }
        }
        setCamerasPanels(cameras);
    }, [camerasHidden, property.cameras]);

    return (
        <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="PropertyCard">
            <Row className="justify-content-center d-flex">
                <FaHouseUser size={50}/>
                <Row className="p-0">
                    <h6 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{property.id}</h6>
                    <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{property.name}</h6>
                    <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{property.address}</h6>
                    <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{property.owner} <span style={{fontSize: "0.8rem", color: "#DC3545", cursor: "pointer"}}
                                                                                                                                        onClick={() => window.location.href = "/owners/" + property.owner}>View</span>
                    </h6>
                </Row>
                {alarmsPanels}
                {camerasPanels}
                <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}} onClick={() => handleViewAlarms()}>View Alarms</Button>
                <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}} onClick={()=> handleViewCameras()}>View Cameras</Button>
            </Row>
        </Card>
    );
}

PropertyCard.propTypes = {
    /** The property details to display */
    property: PropTypes.object,
};

PropertyCard.defaultProps = {};

export default PropertyCard;
