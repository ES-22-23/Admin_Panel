import axios from "axios";
import keycloak from "../Keycloak";

// const keycloakAddress = "http://localhost:8080/auth";
const keycloakAddress = "https://auth.hgsoft.me";

async function getUsers() {
    return await axios.get(keycloakAddress + "/admin/realms/keycloak-react-auth/users", {
        headers: {'Authorization': 'bearer ' + keycloak.token}
    });
}

async function registerUser(user) {
    return await axios.post(keycloakAddress + "/admin/realms/keycloak-react-auth/users", user, {
        headers: {'Authorization': 'bearer ' + keycloak.token}
    });
}

async function deleteUser(userId) {
    return await axios.delete(keycloakAddress + "/admin/realms/keycloak-react-auth/users/" + userId, {
        headers: {'Authorization': 'bearer ' + keycloak.token}
    });
}

async function updateRole(userId, role) {
    return await axios.post(keycloakAddress + "/admin/realms/keycloak-react-auth/users/" + userId + "/role-mappings/realm",
        { name: role },
        { headers : { 'Authorization': 'bearer ' + keycloak.token } }
    );
}

export {getUsers, registerUser, deleteUser, updateRole};