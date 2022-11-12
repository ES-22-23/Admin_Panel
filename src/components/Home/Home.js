import React from 'react';
import ButtonCard from "../ButtonCard/ButtonCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import SecComCarousel from "../SecComCarousel/SecComCarousel";

const Home = () => {

    const options = [
        {title: "Properties", description: "View all properties", link: "/properties", icon: "BsFillHouseDoorFill"},
        {title: "Owners", description: "View all owners", link: "/owners", icon: "BsFillPeopleFill"},
        {title: "Account", description: "View account details", link: "/account", icon: "BsFillPersonFill"},
    ]
    let buttons = []

    for (let idx in options) {
        const option = options[idx]
        buttons.push(
            <Row key={option.title}>
                <ButtonCard title={option.title} description={option.description} link={option.link} icon={option.icon}/>
            </Row>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="Home">
            <Row className="justify-content-center align-items-center d-flex mt-4">
                <Col className="col-lg-2 col-4 px-4 py-2 me-4 shadow"
                     style={{backgroundColor: "rgba(0,0,0,0.60)", backgroundSize: "cover", borderRadius: "20px"}}>
                    {buttons}
                </Col>
                <Col className="col-lg-5">
                    <SecComCarousel />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
