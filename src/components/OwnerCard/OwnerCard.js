import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import {MdFingerprint} from "react-icons/md";
import {Button, Card} from "react-bootstrap";
import PropTypes from "prop-types";

const OwnerCard = (props) => {

    const [owner, setOwner] = useState(props.owner);
    const [hidden, setHidden] = React.useState(true);

    useEffect(() => {
        setOwner(props.owner);
    }, [props.owner]);

    const handleViewProperties = () => {
        window.location.href = "/owners/" + owner.username + "/properties";
    }

    if (owner === undefined) {
        return <div data-testid="OwnerCard"></div>
    }

    return (
        <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="OwnerCard">
            <Row className="justify-content-center d-flex">
                <MdFingerprint size={50}/>
                <Row className="p-0">
                    <h6 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}} data-testid="OwnerName">{owner.name}</h6>
                </Row>
                <Row className="p-0" hidden={hidden}>
                    <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}} data-testid="OwnerUsername">{owner.username}</h6>
                    <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}} data-testid="OwnerEmail">{owner.email}</h6>
                </Row>
            </Row>
            <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}} onClick={()=> setHidden(!hidden)}>View Details</Button>
            <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}} onClick={() => handleViewProperties()}>View Properties</Button>
        </Card>
    );
}

OwnerCard.propTypes = {
    /** Owner details to be displayed on the card */
    owner: PropTypes.object
};

OwnerCard.defaultProps = {
    owner: {"username": "username", "name": "name", "email": "email", "properties": []},
};

export default OwnerCard;
