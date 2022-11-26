import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './AlarmCard.css';
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";
import {RiAlarmWarningFill} from "react-icons/ri";
import CardItem from "../CardItem/CardItem";
import CardBlock from "../CardBlock/CardBlock";

const AlarmCard = (props) => {

    const [alarm, setAlarm] = React.useState(props.alarm);
    useEffect(() => {
        setAlarm(props.alarm);
    }, [props.alarm]);

    const convertToTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    if (!alarm)
        return <div data-testid="AlarmCard"></div>;

    const identification = [{title: "Name", content: alarm.componentName}];

    const availability = [{title: "Availability", content: alarm.componentAvailability.availability},
        {title: "Last Time Online", content: convertToTime(alarm.componentAvailability.lastTimeOnline)}];

    const address = [{title: "Private Address", content: alarm.componentAddress.privateAddress},
        {title: "Public Address", content: alarm.componentAddress.publicAddress}];

    return (
        <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="AlarmCard">
            <Row className="justify-content-center d-flex my-0">
                <RiAlarmWarningFill size={50}/>
                <Row className="p-0 mt-2">
                    <CardItem title="ID" content={alarm.id}/>
                    <CardBlock title="Identification" content={identification}/>
                    <CardBlock title={"Availability"} content={availability}/>
                    <CardBlock title={"Address"} content={address}/>
                </Row>
            </Row>
        </Card>
    );
}

AlarmCard.propTypes = {
    /** Alarm details to be displayed on the card */
    alarm: PropTypes.object
};

AlarmCard.defaultProps = {
    alarm: null
};

export default AlarmCard;
