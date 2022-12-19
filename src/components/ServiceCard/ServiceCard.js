import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './ServiceCard.css';
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";
import {RiAlarmWarningFill} from "react-icons/ri";
import CardItem from "../CardItem/CardItem";
import CardBlock from "../CardBlock/CardBlock";
import {BsCameraVideoFill} from "react-icons/bs";
import {CgWebsite} from "react-icons/cg";
import {AiFillApi} from "react-icons/ai";

const ServiceCard = (props) => {

    const [service, setService] = React.useState(props.service);
    const [icon, setIcon] = React.useState(null);

    useEffect(() => {
        setService(props.service);
        if (props.componentType === "ALARM") {
            setIcon(<RiAlarmWarningFill size={50}/>);
        } else if (props.componentType === "CAMERA") {
            setIcon(<BsCameraVideoFill size={50}/>);
        } else if (props.componentType === "UI") {
            setIcon(<CgWebsite size={50}/>);
        } else if (props.componentType === "API") {
            setIcon(<AiFillApi size={50}/>);
        }
    }, [props]);

    const convertToTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    if (!service)
        return <div data-testid="ServiceCard"></div>;

    const identification = [{title: "Name", content: service.componentName}];

    const availability = [{title: "Availability", content: service.componentAvailability.availability},
        {title: "Last Time Online", content: convertToTime(service.componentAvailability.lastTimeOnline)}];

    const address = [{title: "Private Address", content: service.componentAddress.privateAddress},
        {title: "Public Address", content: service.componentAddress.publicAddress}];

    return (
        <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="ServiceCard">
            <Row className="justify-content-center d-flex my-0">
                {icon}
                <Row className="p-0 mt-2">
                    <CardItem title="ID" content={service.id}/>
                    <CardBlock title="Identification" content={identification}/>
                    <CardBlock title={"Availability"} content={availability}/>
                    <CardBlock title={"Address"} content={address}/>
                </Row>
            </Row>
        </Card>
    );
}

ServiceCard.propTypes = {
    /** Service details to be displayed on the card */
    service: PropTypes.object,
    /** Type of the component */
    componentType: PropTypes.string
};

ServiceCard.defaultProps = {
    service: null,
    componentType: null
};

export default ServiceCard;
