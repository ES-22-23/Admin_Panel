import React from 'react';

import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BsFillHouseDoorFill, BsFillPeopleFill, BsFillPersonFill} from "react-icons/bs";
import Container from "react-bootstrap/Container";

const ButtonCard = (props) => {

    let icon;
    if (props.icon && props.icon === "BsFillHouseDoorFill") {
        icon = <BsFillHouseDoorFill color="black" size="2.2vw" className="mb-2"/>
    } else if (props.icon && props.icon === "BsFillPersonFill") {
        icon = <BsFillPersonFill color="black" size="2.2vw" className="mb-2"/>
    } else if (props.icon && props.icon === "BsFillPeopleFill") {
        icon = <BsFillPeopleFill color="black" size="2.2vw" className="mb-2"/>
    }

    return (
        <Container className="text-center justify-content-center d-flex">
            <Link to={props.link} style={{textDecoration: "none"}}>
                <Button className="shadow my-3 bg-white p-3 justify-content-center"
                        style={{border: "none", borderRadius: "20px", width: "9vw", height: "9vw", maxWidth:"320px", maxHeight:"320px"}}>
                    {icon}
                    <h3 style={{color: "black", fontSize: "1.1vw"}}>{props.title}</h3>
                    <h3 style={{color: "black", fontSize: "0.7vw"}}>{props.description}</h3>
                </Button>
            </Link>
        </Container>
    );

};


export default ButtonCard;
