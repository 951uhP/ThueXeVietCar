import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import "./Owner.scss";
import { useNavigate } from "react-router-dom";
const Owner = () => {
  const benefits = [
    {
      title: "How the insurance works",
      icon: "💰",
      text: "From the minute you hand the keys over till the second you get them back you are covered. Your private insurance is not affected.",
    },
    {
      title: "It's completely free",
      icon: "🆓",
      text: "We offer both owners and renters free sign ups. It’s only once a vehicle is rented out that a share is deducted to cover admin and insurance.",
    },
    {
      title: "You decide the price",
      icon: "✔️",
      text: "When you list a car you decide the price. We can help with recommendations as to price, but ultimately you decide!",
    },
    {
      title: "Handing over your vehicle",
      icon: "🚗",
      text: "You arrange the time and location for the exchange of your vehicle with the renter. Both parties will need to agree and sign the vehicle rental sheet before and after key handover.",
    },
    {
      title: "You are in charge",
      icon: "✅",
      text: "All renters are pre-screened by us to ensure safety and get your approval. If you do not feel comfortable with someone you are able to decline a booking.",
    },
    {
      title: "Set payment",
      icon: "💳",
      text: "We pay you once a month and you can always view how much your car has earned under your user profile.",
    },
  ];

  const navigate = useNavigate();
  const handleListCar = () => {
    navigate("/owner-list-car");
  }

  return (
    <div className="big-container">
      <Container className="rent-benefits-section text-center p-4">
        <h3>Have a car for rent? Don't miss out on your benefit</h3>
        <Row>
          {benefits.map((benefit, index) => (
            <Col md={4} key={index} className="p-3">
              <Card className="h-100">
                <Card.Body>
                  <div className="icon mb-3" style={{ fontSize: "2rem" }}>
                    {benefit.icon}
                  </div>
                  <Card.Title>{benefit.title}</Card.Title>
                  <Card.Text>{benefit.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div>
          <h4>Make money on your car right away</h4>
          <Button variant="warning" className="btn-owner" size="lg" onClick={handleListCar}>
            List Your Car Today
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Owner;
