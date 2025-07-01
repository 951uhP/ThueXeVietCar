import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../Guest/GuestHomePage.scss";

const HowItWorks = () => {
  return (
    <div className="how-it-works-section text-center py-5">
      <Container>
        <h3 className="mb-4">How It Works</h3>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <div className="how-step how-step-blue p-4 shadow-sm rounded h-100">
              <div className="how-icon mb-3">
                <i className="bi bi-search"></i>
              </div>
              <h5>1. Search & Choose</h5>
              <p>Browse our wide selection of cars and pick the one that fits your journey.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="how-step how-step-green p-4 shadow-sm rounded h-100">
              <div className="how-icon mb-3">
                <i className="bi bi-calendar-check"></i>
              </div>
              <h5>2. Book Instantly</h5>
              <p>Book your car online in just a few clicks with instant confirmation.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="how-step how-step-yellow p-4 shadow-sm rounded h-100">
              <div className="how-icon mb-3">
                <i className="bi bi-car-front-fill"></i>
              </div>
              <h5>3. Enjoy Your Ride</h5>
              <p>Pick up your car and enjoy a smooth, safe, and flexible journey!</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HowItWorks;