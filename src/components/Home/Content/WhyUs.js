import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WhyUsCard from './WhyUsCard';
import './component.scss'

import Image1 from '../../../assets/static/image/image1.svg';
import Image2 from '../../../assets/static/image/image2.svg';
import Image3 from '../../../assets/static/image/image3.svg';
import Image4 from '../../../assets/static/image/image4.svg';

const cardsData = [
    { title: "Convenient", text: "We have a large selection of privately owned cars to suit your needs throughout the country", imageUrl: Image1 },
    { title: "Save money", text: "We have no setup or registeration fees. You are only charged when you rent a car. So get started for FREE!", imageUrl: Image2 },
    { title: "Legal and insurance", text: "We fully cover all rentals and even provide roadside assistance. Our rating system and extended member profile checks provide safely", imageUrl: Image3 },
    { title: "24/7 support", text: "Our team is ready to support you and along the way with our 24/7 hotline and services", imageUrl: Image4 },
];

const WhyUs = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Container className="whyUs-container">
            <div className="whyUs-title">
                <h2>Why us?</h2>
            </div>
            {isMobile ? (
                <Slider {...sliderSettings}>
                    {cardsData.map((card, index) => (
                        <div key={index}>
                            <WhyUsCard title={card.title} text={card.text} imageUrl={card.imageUrl} />
                        </div>
                    ))}
                </Slider>
            ) : (
                <Row>
                    {cardsData.map((card, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <WhyUsCard title={card.title} text={card.text} imageUrl={card.imageUrl} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default WhyUs