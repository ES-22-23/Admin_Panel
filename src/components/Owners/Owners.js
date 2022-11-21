import React, {useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";
import OwnerCard from "../OwnerCard/OwnerCard";
import SearchBar from "../SearchBar/SearchBar";
import {getOwners} from "../../utils/ApiHandler";
import {useParams} from "react-router-dom";

const Owners = () => {

    const [allOwners, setAllOwners] = React.useState([]);

    const { username } = useParams();

    useEffect(() => {
        getOwners().then((response) => {

            if (username !== undefined)
                setAllOwners(response.data.filter(owner => owner.username.toLowerCase() === username.toLowerCase()));
            else
                setAllOwners(response.data);

        }).catch((error) => {
            console.log(error);

            const mockOwners = [
                {"username": "John", "name": "John Smith", "email": "jsmith@ua.pt", "properties": [
                        {"id": 1, "name": "Property 1", "address": "Address1", "owner": "John",
                            "cameras": [{"id": 1}, {"id": 2}], "alarms": [{"id": 1}, {"id": 2}, {"id": 3}]}
                    ]},
                {"username": "Luna", "name": "Luna Mary", "email": "luna@ua.pt", "properties": []},
            ];

            if (username !== undefined)
                setAllOwners(mockOwners.filter(owner => owner.username.toLowerCase() === username.toLowerCase()));
            else
                setAllOwners(mockOwners);
        });
    }, [username]);

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
                {username === undefined &&
                    <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/owners"/>
                }

                {username !== undefined &&
                    <Row className="my-4 justify-content-start d-flex" data-testid="SearchBar">
                        <Col className="col-lg-3 col-7 justify-content-start d-flex mb-3">
                            <Button variant="danger" style={{width: "50%"}} href="/new/owners">Add New</Button>
                        </Col>
                        <Col className="col-6 mb-3">
                            <Card className="py-2 px-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.80)", textAlign: "start"}}>
                                <span>Property Owner: <span style={{fontWeight: "bold"}}>{username}</span></span>
                            </Card>
                        </Col>
                        <Col className="col-lg-3 col-7 justify-content-start d-flex mb-3">
                            <Button variant="danger" style={{width: "50%"}} href="/owners">All Users</Button>
                        </Col>
                    </Row>
                }

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
