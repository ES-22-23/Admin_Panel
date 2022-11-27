import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CardItem.css';
import {Card, Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {IoCloseCircle} from "react-icons/io5";

const CardItem = (props) => {

    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    useEffect(() => {
        setTitle(props.title);
        setContent(props.content);
    }, [props]);

    if (props.deleteFunction) {
        return (
            <Row className="m-0 p-0">
                <Col className="col-9 m-0 p-0">
                    <Card className="p-4 my-2 mx-0 cardItem" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}} data-testid="CardItem">
                        <span className="m-0 cardHidden" style={{color: "rgb(255,196,0)", fontSize: "80%"}}>{title}</span>
                        <h6 className="m-0">{content}</h6>
                    </Card>
                </Col>
                <Col className="align-items-center justify-content-center d-flex m-0 px-1">
                    <IoCloseCircle size={30} style={{color: "rgba(255,255,255,0.70)", cursor: "pointer"}} onClick={() => props.deleteFunction(content)}/>
                </Col>
            </Row>
        );
    }

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
