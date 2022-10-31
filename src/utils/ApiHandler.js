import axios from "axios";
import keycloak from "../Keycloak";

// const apiAddress = process.env.REACT_APP_API_URL + "/api";
const apiAddress = "http://management.api.hgsoft.me:8082";

// Owner functions
async function getOwners() {
    return await axios.get(apiAddress + "/owners", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getOwner(ownerId) {
    return await axios.get(apiAddress + "/owners/" + ownerId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function createOwner(owner) {
    return await axios.post(apiAddress + "/owners", owner, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function updateOwner(owner) {
    return await axios.put(apiAddress + "/owners/" + owner.username, owner, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function deleteOwner(ownerId) {
    // ownerId == username
    return await axios.delete(apiAddress + "/owners/" + ownerId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}


// Property functions
async function getProperties() {
    return await axios.get(apiAddress + "/properties", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getProperty(propertyId) {
    return await axios.get(apiAddress + "/properties/" + propertyId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function createProperty(property) {
    return await axios.post(apiAddress + "/properties", property, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function updateProperty(property) {
    return await axios.put(apiAddress + "/properties/" + property.id, property, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function deleteProperty(propertyId) {
    return await axios.delete(apiAddress + "/properties/" + propertyId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}


// Camera functions
async function getCameras() {
    return await axios.get(apiAddress + "/cameras", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getCamera(cameraId) {
    return await axios.get(apiAddress + "/cameras/" + cameraId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function createCamera(camera) {
    return await axios.post(apiAddress + "/cameras", camera, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function updateCamera(camera) {
    return await axios.put(apiAddress + "/cameras/" + camera.id, camera, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function deleteCamera(cameraId) {
    return await axios.delete(apiAddress + "/cameras/" + cameraId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}


// Alarm functions

async function getAlarms() {
    return await axios.get(apiAddress + "/alarms", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getAlarm(alarmId) {
    return await axios.get(apiAddress + "/alarms/" + alarmId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function createAlarm(alarm) {
    return await axios.post(apiAddress + "/alarms", alarm, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function updateAlarm(alarm) {
    return await axios.put(apiAddress + "/alarms/" + alarm.id, alarm, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function deleteAlarm(alarmId) {
    return await axios.delete(apiAddress + "/alarms/" + alarmId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
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
};