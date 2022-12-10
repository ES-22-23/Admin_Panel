import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Row from "react-bootstrap/Row";
import {FaHouseUser} from "react-icons/fa";
import {Button, Card} from "react-bootstrap";
import CardItem from "../CardItem/CardItem";
import CardBlock from "../CardBlock/CardBlock";
import {deleteAlarm, deleteCamera} from "../../utils/ApiHandler";
import {toast} from "react-toastify";

const PropertyCard = (props) => {

    const [property, setProperty] = useState(props.property);

    useEffect(() => {
        setProperty(props.property);
    }, [props.property]);

    if (property === undefined) {
        return <div data-testid="PropertyCard"></div>;
    }

    const details = [
        {title: "Name", content: property.name},
        {title: "Address", content: property.address},
        {title: "Owner", content: property.owner.username}
    ];

    const alarms = [];
    for (let idx in property.alarms) {
        const alarm = property.alarms[idx];
        alarms.push({title: "ID", content: alarm});
    }

    const cameras = [];
    for (let idx in property.cameras) {
        const camera = property.cameras[idx];
        cameras.push({title: "ID", content: camera});
    }

    const deletePropertyAlarm = (id) => {
        console.log("Deleting alarm " + id);
        deleteAlarm(id).then(() => {
            toast.success("Alarm unregistered successfully");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch((error) => {
            console.log(error);
            toast.error("Error unregistering Alarm.");
        });
    }

    const deletePropertyCamera = (id) => {
        console.log("Deleting camera " + id);
        deleteCamera(id).then(() => {
            toast.success("Camera unregistered successfully");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch((error) => {
            console.log(error);
            toast.error("Error unregistering Camera.");
        });
    }

    const deleteCurrentProperty = () => {
        props.deleteCurrentProperty(property);
    }

    return (
        <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="PropertyCard">
            <Row className="justify-content-center d-flex my-0">
                <FaHouseUser size={50}/>
                <Row className="p-0 mt-2">
                    <CardItem title="ID" content={property.id}/>
                    <CardBlock title="Details" content={details}/>
                    <CardBlock title="Alarms" content={alarms} deleteFunction={deletePropertyAlarm.bind(this)}/>
                    <CardBlock title="Cameras" content={cameras} deleteFunction={deletePropertyCamera.bind(this)}/>
                    <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}}
                            onClick={() => window.location.href = "/owners/" + property.owner.username}>View Owner</Button>
                    <Button variant="dark" className="mt-4 p-3" style={{borderRadius: "10px"}}
                            onClick={deleteCurrentProperty}>Delete Property</Button>
                </Row>
            </Row>
        </Card>
    );
}

PropertyCard.propTypes = {
    /** The property details to display */
    property: PropTypes.object,
    /** The function to call when the property is deleted */
    deleteCurrentProperty: PropTypes.func
};

PropertyCard.defaultProps = {};

export default PropertyCard;
