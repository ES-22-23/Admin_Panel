import axios from "axios";
import keycloak from "../Keycloak";

// const keycloakAddress = "http://localhost:8080/auth";
const keycloakAddress = "https://auth.hgsoft.me";

async function getUsers() {
    return await axios.get(keycloakAddress + "/admin/realms/keycloak-react-auth/users", {
        headers: {'Authorization': 'bearer ' + keycloak.token}
    });
}

export {getUsers};