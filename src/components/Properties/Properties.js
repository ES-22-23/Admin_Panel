import React, {useEffect} from 'react';
import './Properties.css';
import {deleteProperty, getProperties} from "../../utils/ApiHandler";
import {Col} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SearchBar from "../SearchBar/SearchBar";
import PropertyCard from "../PropertyCard/PropertyCard";
import DeleteModal from "../DeleteModal/DeleteModal";
import {toast} from "react-toastify";

const Properties = () => {

    const [allProperties, setAllProperties] = React.useState([]);
    const [properties, setProperties] = React.useState([]);

    const [currentProperty, setCurrentProperty] = React.useState(null);

    useEffect(() => {
        getProperties().then((response) => {
            setAllProperties(response.data);
        }).catch((error) => {
            console.log(error);
            toast.error("Unable to get Properties.")
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

    const handleDelete = (deleteOption) => {
        if (deleteOption) {
            deleteProperty(currentProperty.id).then(() => {
                toast.success("Property deleted successfully.");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }).catch((error) => {
                console.log(error);
                toast.error("Unable to delete Property " + currentProperty.id + ".");
            });
        }
        setCurrentProperty(null);
    }

    let propertiesPanel = [];
    for (let idx in properties) {
        const property = properties[idx]
        propertiesPanel.push(
            <Col className="mb-4 col-lg-3 col-6" key={property.username}>
                <PropertyCard property={property} deleteCurrentProperty={setCurrentProperty.bind(this)}/>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Properties">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/properties" addNewText="Property"
                placeholder="[Name, Address, Owner]"/>
                <Row className="justify-content-start d-flex">
                    {propertiesPanel}
                </Row>
            </Row>
            {currentProperty !== null &&
                <DeleteModal handleDelete={handleDelete.bind(this)}/>
            }
        </Container>
    );
};

Properties.propTypes = {};

Properties.defaultProps = {};

export default Properties;
