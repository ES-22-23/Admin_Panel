import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import background from '../../images/Background.jpg';

const SecComCarousel = () => {
    return (
        <Carousel data-testid="SecComCarousel">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={background}
                    style={{borderRadius: "20px"}}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>SecCom Smart Security</h3>
                    <p>Smart CCTV system with built-in intruder detection and alarms for enterprises.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={background}
                    style={{borderRadius: "20px"}}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>SecCom Functionalities</h3>
                    <p>The SecCom Smart Security system allows enterprises to create and run a smart CCTV system to improve the security of their buildings.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={background}
                    style={{borderRadius: "20px"}}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>SecCom Support</h3>
                    <p>Intruder detection powered by AI/ML modules and Intrusion Alarms that are triggered when an intruder is detected.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default SecComCarousel;
