import React, {useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import OwnerCard from "../OwnerCard/OwnerCard";
import SearchBar from "../SearchBar/SearchBar";
import {getOwners} from "../../utils/ApiHandler";

const Owners = () => {

    const [allOwners, setAllOwners] = React.useState([]);

    useEffect(() => {
        getOwners().then((response) => {
            setAllOwners(response.data);
        }).catch((error) => {
            console.log(error);
            setAllOwners([
                {"username": "John", "name": "John Smith", "email": "jsmith@ua.pt", "properties": [
                    {"id": 1, "name": "Property 1", "address": "Address1", "owner":
                            {"username": "John", "name": "John Smith", "email": "jsmith@ua.pt"},
                        "cameras": [{"id": 1}, {"id": 2}], "alarms": [{"id": 1}, {"id": 2}, {"id": 3}]}
                    ]},
                {"username": "Luna", "name": "Luna Mary", "email": "luna@ua.pt", "properties": []},
            ]);
        });
    }, []);

    useEffect(() => {
        setOwners(allOwners);
    }, [allOwners]);

    const [owners, setOwners] = React.useState([]);

    const handleSearch = (search) => {
        if (search !== "") {
            setOwners(allOwners.filter(owner => owner.username.toLowerCase().includes(search.toLowerCase())
                || owner.name.toLowerCase().includes(search.toLowerCase())));
        } else { setOwners(allOwners); }
    };

    let ownersPanels = [];
    for (let idx in owners) {
        const owner = owners[idx]
        ownersPanels.push(
            <Col className="mb-4 col-lg-3 col-6">
                <OwnerCard owner={owner} key={owner.username}/>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Owners">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)}/>
                <Row className="justify-content-start d-flex">
                    {ownersPanels}
                </Row>
            </Row>
        </Container>
    );
}

Owners.propTypes = {};

Owners.defaultProps = {};

export default Owners;
