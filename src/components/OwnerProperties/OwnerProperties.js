import React, {useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import PropertyCard from "../PropertyCard/PropertyCard";
import SearchBar from "../SearchBar/SearchBar";
import {getOwner, getProperty} from "../../utils/ApiHandler";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

const OwnerProperties = () => {

    const { username } = useParams();

    const [owner, setOwner] = React.useState(undefined);
    const [allProperties, setAllProperties] = React.useState([]);
    const [properties, setProperties] = React.useState([]);

    useEffect(() => {
        getOwner(username).then((response) => {
            setOwner(response.data);
        }).catch((error) => {
            console.log(error);
            toast.error("Unable to get Owner.");
        });
    }, [username]);

    useEffect(() => {
        if (owner !== undefined) {

            // Obtain property details
            for (let idx in owner.properties) {
                const property = owner.properties[idx];
                getProperty(property).then((response) => {
                    setAllProperties(allProperties => [...allProperties, response.data]);

                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }, [owner]);

    useEffect(() => {
        setProperties(allProperties);
    }, [allProperties]);

    const handleSearch = (search) => {
        if (search !== "") {
            setProperties(allProperties.filter(property => property.address.toLowerCase().includes(search.toLowerCase())
                || property.name.toLowerCase().includes(search.toLowerCase())));
        } else { setProperties(allProperties); }
    };

    let propertiesPanels = [];
    for (let idx in properties) {
        const property = properties[idx];
        propertiesPanels.push(
            <Col className="mb-4 col-lg-3 col-6" key={property.id}>
                <PropertyCard property={property}/>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="OwnerProperties">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/properties"/>
                <Row className="justify-content-start d-flex">
                    {propertiesPanels}
                </Row>
            </Row>
        </Container>
    );
};

OwnerProperties.propTypes = {};

OwnerProperties.defaultProps = {};

export default OwnerProperties;
