import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './VideoModal.css';
import {Modal} from "react-bootstrap";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import {FaRegEye} from "react-icons/fa";

const VideoModal = (props) => {

    const [show, setShow] = useState(true);
    const [intrusion, setIntrusion] = useState(props.intrusion);

    useEffect(() => {
        setIntrusion(props.intrusion);
    }, [props.intrusion]);

    const handleClose = () => {
        setShow(false);
        props.handleClose();
    }

    return (
        <Modal size="lg" centered
               show={show} onHide={handleClose}
               style={{backgroundColor: "rgba(0,0,0,0.60)"}}
               data-testid="VideoModal">
            <Modal.Header closeButton >
                <Modal.Title>
                    <h5 className="align-items-center d-flex"><FaRegEye className="me-3" /> {intrusion.intrusionDate}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="mt-2">Property ID: {intrusion.propertyID}</h6>
                <h6 className="mb-4">Camera ID: {intrusion.cameraID}</h6>
                <Video autoPlay loop muted
                       controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                       poster="http://sourceposter.jpg">
                    <source src="http://sourcefile.webm" type="video/webm" />
                </Video>
            </Modal.Body>
        </Modal>
    );
}

VideoModal.propTypes = {
    /** The intrusion to display */
    intrusion: PropTypes.object,
    /** The function to call when the modal is closed */
    handleClose: PropTypes.func.isRequired
};

VideoModal.defaultProps = {
    intrusion: {
        key: "",
        propertyID: "",
        cameraID: "",
        intrusionDate: ""
    },
    handleClose: () => {}
};

export default VideoModal;
