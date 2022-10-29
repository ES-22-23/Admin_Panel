import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://auth.hgsoft.me/",
    realm: "keycloak-react-auth",
    clientId: "React-auth",
});

export default keycloak;