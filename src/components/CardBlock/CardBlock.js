import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CardBlock.css';
import CardItem from "../CardItem/CardItem";
import Row from "react-bootstrap/Row";
import {FaArrowDown, FaArrowRight} from "react-icons/fa";

const CardBlock = (props) => {

    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    const [hideContent, setHideContent] = useState(true);

    useEffect(() => {
        setTitle(props.title);
        setContent(props.content);
    }, [props]);


    let items = [];
    for (let idx in content) {
        const blockItem = content[idx];
        if (props.deleteFunction)
            items.push(<CardItem title={blockItem.title} content={blockItem.content} key={blockItem.title}
                deleteFunction={props.deleteFunction}/>);
        else
            items.push(<CardItem title={blockItem.title} content={blockItem.content} key={blockItem.title}/>);
    }

    return (
        <Row className="mt-3 mx-0 p-0" data-testid="CardBlock">
            <h5 onClick={() => setHideContent(!hideContent)} className="cardBlockTitle">
                {hideContent ? <FaArrowRight className="cardBlockArrow" /> : <FaArrowDown className="cardBlockArrow" />} {title}
            </h5>
            {!hideContent && items}
        </Row>
    );
}

CardBlock.propTypes = {
    /** Title of the card block */
    title: PropTypes.string,
    /** Items of the card block */
    content: PropTypes.array
};

CardBlock.defaultProps = {};

export default CardBlock;
