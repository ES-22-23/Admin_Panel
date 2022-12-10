import axios from "axios";
import keycloak from "../Keycloak";

const apiAddress = "http://serviceregistry.scss.hgsoft.me/registry";

async function getServices() {
    return await axios.get(apiAddress + "/services", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function registerService(request) {
    return await axios.post(apiAddress + "/register", request, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function unregisterService(request) {
    return await axios.delete(apiAddress + "/unregister/", request, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

export {getServices, registerService, unregisterService};