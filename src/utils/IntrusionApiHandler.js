import axios from "axios";
import keycloak from "../Keycloak";

// const apiAddress = process.env.REACT_APP_API_URL + "/api";
const apiAddress = "http://loadbalancer.scss.hgsoft.me:8083";

async function getVideos() {
    return await axios.get(apiAddress + "/intrusions", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getVideosFromProperty(propertyId) {
    return await axios.get(apiAddress + "/intrusions/property/" + propertyId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getVideosFromCamera(cameraId) {
    return await axios.get(apiAddress + "/intrusions/camera/" + cameraId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getVideoUrl(videoId) {
    return await axios.get(apiAddress + "/intrusions/url/" + videoId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

export {getVideos, getVideosFromProperty, getVideosFromCamera, getVideoUrl};