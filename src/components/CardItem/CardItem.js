import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CardItem.css';
import {Card} from "react-bootstrap";

const CardItem = (props) => {

    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    useEffect(() => {
        setTitle(props.title);
        setContent(props.content);
    }, [props]);

    return (
        <Card className="p-4 my-2 mx-0 cardItem" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}} data-testid="CardItem">
            <span className="m-0 cardHidden" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>{title}</span>
            <h6 className="m-0">{content}</h6>
        </Card>
    );
}

CardItem.propTypes = {
    /** Title of the card item */
    title: PropTypes.string,
    /** Content of the card item */
    content: PropTypes.any
};

CardItem.defaultProps = {};

export default CardItem;
