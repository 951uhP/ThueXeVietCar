import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import CarCard from "./CarCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cardsData = [
  { title: "Card 1", text: "This is card number 1." },
  { title: "Card 2", text: "This is card number 2." },
  { title: "Card 3", text: "This is card number 3." },
  { title: "Card 4", text: "This is card number 4." },
  { title: "Card 5", text: "This is card number 5." },
  { title: "Card 6", text: "This is card number 6." },
  { title: "Card 7", text: "This is card number 7." },
  { title: "Card 8", text: "This is card number 8." },
  // Add more cards as needed
];

const ListCar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Container className="mt-4 cars-container">
      {isMobile ? (
        <Slider {...sliderSettings}>
          {cardsData.map((card, index) => (
            <div key={index}>
              <CarCard title={card.title} text={card.text} />
            </div>
          ))}
        </Slider>
      ) : (
        <Row>
          {cardsData.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <CarCard title={card.title} text={card.text} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ListCar;
