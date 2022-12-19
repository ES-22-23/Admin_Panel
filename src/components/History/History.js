import React, {useEffect} from 'react';
import './History.css';
import {Button, Card, Col} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {getActions} from "../../utils/ApiHandler";
import {toast} from "react-toastify";

const History = () => {

    const [allHistory, setAllHistory] = React.useState([]);
    const [history, setHistory] = React.useState([]);

    useEffect(() => {
        getActions().then((response) => {
            if (response)
                setAllHistory(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        }).catch((error) => {
            console.log(error);
            toast.error("Unable to get History.");
        });
    }, []);

    useEffect(() => {
        setHistory(allHistory);
    }, [allHistory]);

    const [action, setAction] = React.useState("All");
    const [entity, setEntity] = React.useState("All");

    const [input, setInput] = React.useState("");
    const [search, setSearch] = React.useState("");

    useEffect(() => {

        let historyFiltered = [];
        if (action !== "All" && entity !== "All")
            historyFiltered.push(...allHistory.filter(history => history.entity_type === entity && history.action_type === action.toUpperCase()));
        else if (action !== "All")
            historyFiltered.push(...allHistory.filter(history => history.action_type === action.toUpperCase()));
        else if (entity !== "All")
            historyFiltered.push(...allHistory.filter(history => history.entity_type === entity));
        else
            historyFiltered.push(...allHistory);

        if (search !== "")
            historyFiltered = historyFiltered.filter(history => history.admin.toLowerCase().includes(search.toLowerCase()));

        setHistory(historyFiltered);

    }, [action, entity, search]);

    const handleSearch = () => {
        setSearch(input);
    };

    let actionsPanels = [];
    for (let idx in history) {
        const action = history[idx];
        actionsPanels.push(
            <Card className="my-2 mx-0" style={{backgroundColor: "rgba(0,0,0,0.60)"}} key={action.id} data-testid={action.id}>
                <Card.Body>
                    <Card.Title><span style={{color: "#ffc400", fontSize: "85%"}}>{action.action_type}</span> {action.entity_type} {action.entity_id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{action.date.replace("T", " ")}</Card.Subtitle>
                    <Card.Text>By {action.admin}</Card.Text>
                </Card.Body>
            </Card>
        );
    }

    if (actionsPanels.length === 0)
        actionsPanels = <h6>No results.</h6>;

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="History">
            <Row className="w-75 mx-2">
                <Row className="m-0">
                    <Col className="col-lg-3 col-6">
                        <Card className="mt-4 p-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.70)", textAlign: "start"}}>
                            <h6>Filter by <br /><span style={{fontWeight: "bold"}}>Entity</span></h6>
                            <Form.Group className="py-2" data-testid="EntityForm">
                                <Form.Select className="text-white" style={{backgroundColor: "rgba(0,0,0,0.80)", border: "none"}}
                                             onChange={(event) => setEntity(event.target.value)}>
                                    <option value="All">All</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Property">Property</option>
                                    <option value="Alarm">Alarm</option>
                                    <option value="Camera">Camera</option>
                                </Form.Select>
                            </Form.Group>
                        </Card>
                    </Col>
                    <Col className="col-lg-3 col-6">
                        <Card className="mt-4 p-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.70)", textAlign: "start"}}>
                            <h6>Filter by <br /><span style={{fontWeight: "bold"}}>Action</span></h6>
                            <Form.Group className="py-2" data-testid="ActionForm">
                                <Form.Select className="text-white" style={{backgroundColor: "rgba(0,0,0,0.80)", border: "none"}}
                                             onChange={(event) => setAction(event.target.value)}>
                                    <option value="All">All</option>
                                    <option value="Create">Created</option>
                                    <option value="Delete">Deleted</option>
                                    <option value="Update">Updated</option>
                                </Form.Select>
                            </Form.Group>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="mt-4 p-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.70)", textAlign: "start"}}>
                           <Row>
                               <Col>
                                   <h6>Search by <br /><span style={{fontWeight: "bold"}}>Admin</span></h6>
                               </Col>
                               <Col>
                                   <Button className="w-100" variant="danger" onClick={handleSearch.bind(this)}>Search</Button>
                               </Col>
                           </Row>
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
                        </Card>
                    </Col>
                </Row>
                <Card className="p-5 mt-4 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                    {actionsPanels}
                </Card>
            </Row>
        </Container>
    );
}

History.propTypes = {};

History.defaultProps = {};

export default History;
