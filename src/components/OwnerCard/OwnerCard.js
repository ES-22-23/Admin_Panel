import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import {Button, Card} from "react-bootstrap";
import PropTypes from "prop-types";
import {FaHouseUser} from "react-icons/fa";
import CardItem from "../CardItem/CardItem";
import CardBlock from "../CardBlock/CardBlock";

const OwnerCard = (props) => {

    const [owner, setOwner] = useState(props.owner);

    useEffect(() => {
        setOwner(props.owner);
    }, [props.owner]);

    if (owner === undefined) {
        return <div data-testid="OwnerCard"></div>
    }

    const details = [
        {title: "Name", content: owner.name},
        {title: "Email", content: owner.email}
    ];

    return (
        <Card className="p-5 text-white shadow"
              style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}
              data-testid="OwnerCard">
            <Row className="justify-content-center d-flex my-0">
                <FaHouseUser size={50}/>
                <Row className="p-0 mt-2">
                    <CardItem title="Username" content={owner.username}/>
                    <CardBlock title="Details" content={details}/>
                    <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}}
                            onClick={() => window.location.href = "/owners/" + owner.username + "/properties"}>View
                        Properties</Button>
                </Row>
            </Row>
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
