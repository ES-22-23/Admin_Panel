import React, {useEffect} from 'react';
import './Properties.css';
import {getProperties} from "../../utils/ApiHandler";
import {Col} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SearchBar from "../SearchBar/SearchBar";
import PropertyCard from "../PropertyCard/PropertyCard";

const Properties = () => {

    const [allProperties, setAllProperties] = React.useState([]);
    const [properties, setProperties] = React.useState([]);

    useEffect(() => {
        getProperties().then((response) => {
            setAllProperties(response.data);
        }).catch((error) => {
            console.log(error);
            setAllProperties([
                {"id": 1, "name": "Property 1", "address": "Address 1", "owner": {"username": "John"},
                    "cameras": ["a30c95b6-073b-4616-9b3d-f5c24304768c"], "alarms": ["b9823-073b-4616-9b3d-f5c2qwe4768c"]},
                {"id": 2, "name": "Property 2", "address": "Address 2", "owner": {"username": "Luna"},
                    "cameras": ["k1sdn20b6-073b-3526-9b3d-f5c24304768c"], "alarms": ["c823gh823-073b-8216-4b3d-f5c2qwe4768c"]},
            ]);
        });
    }, []);

    useEffect(() => {
        setProperties(allProperties);
    }, [allProperties]);


    const handleSearch = (search) => {
        if (search !== "") {
            setProperties(allProperties.filter(property => property.name.toLowerCase().includes(search.toLowerCase()) ||
                property.address.toLowerCase().includes(search.toLowerCase()) || property.owner.toLowerCase().includes(search.toLowerCase())));
        } else { setProperties(allProperties); }
    };

    let propertiesPanel = [];
    for (let idx in properties) {
        const property = properties[idx]
        propertiesPanel.push(
            <Col className="mb-4 col-lg-3 col-6" key={property.username}>
                <PropertyCard property={property}/>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Properties">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/properties"/>
                <Row className="justify-content-start d-flex">
                    {propertiesPanel}
                </Row>
            </Row>
        </Container>
    );
};

Properties.propTypes = {};

Properties.defaultProps = {};

export default Properties;
