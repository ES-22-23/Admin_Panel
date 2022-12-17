import axios from "axios";
import keycloak from "../Keycloak";

// const apiAddress = process.env.REACT_APP_API_URL + "/api";
const apiAddress = "http://loadbalancer.scss.hgsoft.me:8082";

// Owner functions
async function getOwners() {
    return await axios.get(apiAddress + "/owners", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getOwner(ownerId) {
    return await axios.get(apiAddress + "/owners/" + ownerId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function createOwner(owner) {
    return await axios.post(apiAddress + "/owners", owner, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function updateOwner(owner) {
    return await axios.put(apiAddress + "/owners/" + owner.username, owner, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function deleteOwner(ownerId) {
    // ownerId == username
    return await axios.delete(apiAddress + "/owners/" + ownerId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}


// Property functions
async function getProperties() {
    return await axios.get(apiAddress + "/properties", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getProperty(propertyId) {
    return await axios.get(apiAddress + "/properties/" + propertyId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function createProperty(property) {
    return await axios.post(apiAddress + "/properties", property, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function updateProperty(property) {
    return await axios.put(apiAddress + "/properties/" + property.id, property, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function deleteProperty(propertyId) {
    return await axios.delete(apiAddress + "/properties/" + propertyId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}


// Camera functions
async function getCameras() {
    return await axios.get(apiAddress + "/cameras", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getCamera(cameraId) {
    return await axios.get(apiAddress + "/cameras/" + cameraId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function createCamera(camera) {
    return await axios.post(apiAddress + "/cameras", camera, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function updateCamera(camera) {
    return await axios.put(apiAddress + "/cameras/" + camera.id, camera, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function deleteCamera(cameraId) {
    return await axios.delete(apiAddress + "/cameras/" + cameraId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}


// Alarm functions

async function getAlarms() {
    return await axios.get(apiAddress + "/alarms", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getAlarm(alarmId) {
    return await axios.get(apiAddress + "/alarms/" + alarmId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function createAlarm(alarm) {
    return await axios.post(apiAddress + "/alarms", alarm, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function updateAlarm(alarm) {
    return await axios.put(apiAddress + "/alarms/" + alarm.id, alarm, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function deleteAlarm(alarmId) {
    return await axios.delete(apiAddress + "/alarms/" + alarmId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getActions() {
    return await axios.get(apiAddress + "/actions", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}


export {
    getOwners,
    getOwner,
    createOwner,
    updateOwner,
    deleteOwner,
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    getCameras,
    getCamera,
    createCamera,
    updateCamera,
    deleteCamera,
    getAlarms,
    getAlarm,
    createAlarm,
    updateAlarm,
    deleteAlarm,
    getActions
};
