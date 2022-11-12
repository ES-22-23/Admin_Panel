import React from 'react';

import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BsFillHouseDoorFill, BsFillPeopleFill, BsFillPersonFill} from "react-icons/bs";
import PropTypes from "prop-types";

const ButtonCard = (props) => {

    let icon;
    if (props.icon && props.icon === "BsFillHouseDoorFill") {
        icon = <BsFillHouseDoorFill color="black" size="2.2vw" className="mb-2"/>
    } else if (props.icon && props.icon === "BsFillPersonFill") {
        icon = <BsFillPersonFill color="black" size="2.2vw" className="mb-2"/>
    } else if (props.icon && props.icon === "BsFillPeopleFill") {
        icon = <BsFillPeopleFill color="black" size="2.2vw" className="mb-2"/>
    } else if (props.icon) {
        icon = <BsFillPeopleFill color="black" size="2.2vw" className="mb-2"/>
    }

    return (
        <Link to={props.link} style={{textDecoration: "none"}} data-testid={props.title + "Button"}>
            <Button className="shadow my-3 bg-white px-2 p-4 justify-content-center w-100"
                    style={{border: "none", borderRadius: "20px"}}>
                {icon}
                <h3 style={{color: "black", fontSize: "120%"}}>{props.title}</h3>
                <h3 style={{color: "black", fontSize: "80%"}}>{props.description}</h3>
            </Button>
        </Link>
    );

};

ButtonCard.propTypes = {
    /** Title to be displayed on the button */
    title: PropTypes.string,
    /** Description to understand what the button does */
    description: PropTypes.string,
    /** Link to the page the button will take you to */
    link: PropTypes.string,
    /** Icon to be displayed on the button */
    icon: PropTypes.string
};

ButtonCard.defaultProps = {
    title: "Title",
    description: "Description",
    link: "/",
    icon: "BsFillHouseDoorFill"
}

export default ButtonCard;
