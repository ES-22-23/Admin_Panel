import React, {useEffect} from 'react';
import './AutoComplete.css';
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {getOwners} from "../../utils/ApiHandler";
import PropTypes from "prop-types";

const AutoComplete = (props) => {

    const [input, setInput] = React.useState(props.input);
    const [allSuggestions, setAllSuggestions] = React.useState([]);
    const [suggestions, setSuggestions] = React.useState([]);

    useEffect(() => {
        getOwners().then((response) => {
            setAllSuggestions(response.data);
        }).catch((error) => {
            console.log(error);
            const mockOwners = [
                {"username": "John", "name": "John Smith", "email": "jsmith@ua.pt", "properties": [
                        {"id": 1, "name": "Property 1", "address": "Address1", "owner": "John",
                            "cameras": [{"id": 1}, {"id": 2}], "alarms": [{"id": 1}, {"id": 2}, {"id": 3}]}
                    ]},
                {"username": "Luna", "name": "Luna Mary", "email": "luna@ua.pt", "properties": []},
            ];
            setAllSuggestions(mockOwners);
        });
    }, []);

    useEffect(() => {
        setInput(props.input);
    }, [props.input]);

    useEffect(() => {
        setSuggestions(allSuggestions.filter(owner => owner.username.toLowerCase().includes(input.toLowerCase())));
    }, [input, allSuggestions]);

    const handleClick = (username) => {
        props.handleAutocomplete(username);
    };

    if (input === "" || suggestions.length === 0) {
        return null;
    }

    let suggestionsPanels = [];
    for (let idx in suggestions) {
        const suggestion = suggestions[idx];
        suggestionsPanels.push(
            <Row className="mt-1" key={suggestion.username}>
                <h6 id="autocomplete" onClick={() => handleClick(suggestion.username)}>{suggestion.username}</h6>
            </Row>
        );
    }

    return (
        <Card className="p-3 text-white shadow" style={{border: "none", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="PropertyCard">
            <Row className="justify-content-center d-flex">
                {suggestionsPanels}
            </Row>
        </Card>
    );

};

AutoComplete.propTypes = {
    /** The input to be autocompleted */
    input: PropTypes.string,
    /** The function to be called when an autocomplete is selected */
    handleAutoComplete: PropTypes.func
};

AutoComplete.defaultProps = {
    input: "",
    handleAutoComplete: () => {}
};

export default AutoComplete;
