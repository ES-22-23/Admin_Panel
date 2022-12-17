import React, {useEffect, useState} from 'react';
import './AutoComplete.css';
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {getOwners} from "../../utils/ApiHandler";
import PropTypes from "prop-types";
import {toast} from "react-toastify";

const AutoComplete = (props) => {

    const [input, setInput] = useState(props.input);
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        getOwners().then((response) => {
            setAllSuggestions(response.data);
        }).catch((error) => {
            console.log(error);
            toast.error("Unable to get Owners.")
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
        return <div data-testid="AutoComplete"></div>;
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
        <Card className="p-3 text-white shadow" style={{border: "none", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}} data-testid="AutoComplete">
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
