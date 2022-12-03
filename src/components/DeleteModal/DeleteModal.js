import React from 'react';
import PropTypes from 'prop-types';
import './DeleteModal.css';
import {Button, Modal} from "react-bootstrap";

const DeleteModal = (props) => {

    const [show, setShow] = React.useState(true);

    const handleClose = () => {
        setShow(false);
        props.handleDelete(false);
    }

    const handleDelete = () => {
        props.handleDelete();
        setShow(false);
        props.handleDelete(true);
    }

    return (
        <Modal size="lg" centered onHide={handleClose} show={show}
               style={{backgroundColor: "rgba(0,0,0,0.60)"}}
               data-testid="DeleteModal">
            <Modal.Header closeButton>
                <Modal.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="mt-1 mx-2"><span style={{fontWeight: "bold"}}>Warning: </span> Are you sure you want to delete?</h6>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" className="mt-4 py-3 px-4" style={{borderRadius: "10px"}}
                        onClick={handleClose}>Cancel</Button>
                <Button variant="danger" className="mt-4 py-3 px-4" style={{borderRadius: "10px"}}
                        onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

DeleteModal.propTypes = {
    /** Function to confirm or cancel deletion */
    handleDelete: PropTypes.func
};

DeleteModal.defaultProps = {};

export default DeleteModal;
