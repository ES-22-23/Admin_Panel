import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './VideoModal.css';
import {Modal, Spinner} from "react-bootstrap";
import {FaRegEye} from "react-icons/fa";
import {toast} from "react-toastify";
import Row from "react-bootstrap/Row";

import { DefaultPlayer as Video } from 'react-html5video';
import './html5video_styles.css';
import {getVideoUrl} from "../../utils/IntrusionApiHandler";

const VideoModal = (props) => {

    const [show, setShow] = useState(true);
    const [intrusion, setIntrusion] = useState(props.intrusion);
    const [videoUrl, setVideoUrl] = useState(undefined);

    useEffect(() => {
        setIntrusion(props.intrusion);
    }, [props.intrusion]);

    useEffect(() => {

        if (intrusion) {
            getVideoUrl(intrusion.id).then((response) => {
                setVideoUrl(response.data);
            }).catch((error) => {
                // console.log(error);
                toast.error("Unable to get Video.");
            });
        }

    }, [props.intrusion]);

    const handleClose = () => {
        setShow(false);
        props.handleClose();
    }

    if (!intrusion) {
        return <div data-testid="VideoModal"></div>;
    }

    return (
        <Modal size="lg" centered
               show={show} onHide={handleClose}
               style={{backgroundColor: "rgba(0,0,0,0.60)"}}
               data-testid="VideoModal">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5 className="align-items-center d-flex mt-2"><FaRegEye className="me-3" /> {new Date(intrusion.timestamp).toLocaleString()}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="mt-1 mx-2"><span style={{fontWeight: "bold"}}>Property ID:</span> {intrusion.propertyID}</h6>
                <h6 className="mb-4 mx-2"><span style={{fontWeight: "bold"}}>Camera ID:</span> {intrusion.cameraID}</h6>
                <h6 className="mb-4 mx-2"><span style={{fontWeight: "bold"}}>Video Url:</span> {videoUrl}</h6>
                {videoUrl &&
                    <Video autoPlay loop muted
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']} >
                    <source src={videoUrl} type="video/mp4" />
                    </Video>
                }
                {!videoUrl &&
                    <Row className="d-flex justify-content-center my-5" data-testid="Loading">
                        <Spinner animation="border" role="status"/>
                    </Row>
                }
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
    intrusion: null,
    handleClose: () => {}
};

export default VideoModal;
