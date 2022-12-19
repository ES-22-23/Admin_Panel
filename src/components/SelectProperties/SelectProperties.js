import React, {useEffect, useState} from 'react';
import './SelectProperties.css';
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";
import {BsQuestionSquareFill} from "react-icons/bs";
import {getProperties} from "../../utils/ApiHandler";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import {toast} from "react-toastify";

const SelectProperties = (props) => {

    const [allProperties, setAllProperties] = useState([]);
    const [properties, setProperties] = useState([]);

    const [currentProperty, setCurrentProperty] = useState(undefined);

    const [input, setInput] = React.useState("");
    const [search, setSearch] = React.useState("");

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

    useEffect(() => {
        if (search !== "") {
            setProperties(allProperties.filter(property => property.name.toLowerCase().includes(search.toLowerCase()) ||
                property.address.toLowerCase().includes(search.toLowerCase()) || property.owner.username.toLowerCase().includes(search.toLowerCase())));
        } else { setProperties(allProperties); }
    }, [search]);

    const handleSearch = () => {
        setSearch(input);
    }

    const handleClick = (property) => {
        if (props.handleSelection)
            props.handleSelection(property);
        setCurrentProperty(property);
    }

    let propertyPanel;
    if (currentProperty !== undefined) {
        propertyPanel =
            <Card className="p-4 my-2 mx-0 cardItem text-white" data-testid="SelectedProperty" style={{
                borderRadius: "20px",
                backgroundColor: "rgba(0,0,0,0.80)"
            }}>
                <span className="m-0 cardHidden"
                      style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Property ID</span>
                <h6 className="mx-0">{currentProperty.id}</h6>
                <span className="m-0 cardHidden"
                      style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Property Name</span>
                <h6 className="mx-0">{currentProperty.name}</h6>
                <span className="m-0 cardHidden"
                      style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Property Owner</span>
                <h6 className="m-0">{currentProperty.owner.username}</h6>
            </Card>
        ;
    } else {
        propertyPanel =
            <Card className="p-4 my-2 mx-0 text-white" data-testid="SelectedProperty" style={{
                borderRadius: "20px",
                backgroundColor: "rgba(0,0,0,0.80)"
            }}>
                <h6 className="m-0 align-items-center d-flex"><BsQuestionSquareFill size={30} className="me-3"/> Select
                    a Property</h6>
            </Card>
        ;
    }

    let propertiesPanels = [];
    for (let idx in properties) {
        const property = properties[idx];
        propertiesPanels.push(
            <Card key={idx} className="p-4 my-2 mx-0 cardItem"
                  style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}
                  onClick={() => handleClick(property)}>
                <span className="m-0 mt-1 cardHidden"
                      style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Property ID</span>
                <h6 className="mx-0">{property.id}</h6>
                <span className="m-0 cardHidden"
                      style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Property Name</span>
                <h6 className="mx-0">{property.name}</h6>
                <span className="m-0 cardHidden"
                      style={{color: "rgb(255,196,0)", fontSize: "80%"}}>Property Owner</span>
                <h6 className="m-0">{property.owner.username}</h6>
            </Card>
        );
    }

    return (
        <Card className="p-5 text-white shadow" data-testid="SelectProperties"
              style={{
                  border: "none",
                  borderRadius: "20px",
                  backgroundColor: "rgba(0,0,0,0.60)",
                  textAlign: "start",
                  height: "100%",
              }}>
            <Row className="justify-content-center d-flex">
                <Card className="mb-3 p-3 text-white shadow" style={{
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "rgba(0,0,0,0.60)",
                    textAlign: "start"
                }}>
                    <Row className="align-items-center d-flex">
                        <Col className="col-8">
                            <Form className="py-2" autoComplete="off">
                                <Form.Control
                                    id="search"
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 shadow text-white"
                                    aria-label="Search"
                                    style={{backgroundColor: "rgba(0,0,0,0.80)", borderRadius: "10px", border: "none"}}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            handleSearch();
                                        }
                                    }}
                                />
                            </Form>
                        </Col>
                        <Col>
                            <Button className="w-100" variant="danger" onClick={handleSearch.bind(this)}>Search</Button>
                        </Col>
                    </Row>
                </Card>
                <Row className="mx-0 mb-4 p-0 scrollable">
                    {propertiesPanels}
                </Row>
            </Row>
            {propertyPanel}
        </Card>
    );
};

SelectProperties.propTypes = {
    /** Function to handle the selection of a property */
    handleSelection: PropTypes.func
};

SelectProperties.defaultProps = {};

export default SelectProperties;
