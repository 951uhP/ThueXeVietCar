import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./GuestHomePage.scss";
import { useNavigate } from "react-router-dom";
import WhyUs from "../Content/WhyUs";
import LocationSection from "../Content/LocationSection";
import "animate.css";

const GuestHomePage = () => {
  return (
    <Container fluid className="guest-homepage">
      <HeaderSection />
      <WhyUs />
      <HowItWorksSection /> {/* Thay thế TestimonialsSection */}
      <LocationSection />
    </Container>
  );
};

const HeaderSection = () => {
  const navigate = useNavigate();

  return (
    <div className="header-section-animated">
      <div className="header-bg-overlay" />
      <Container className="header-content-container">
        <Row className="justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <Col md={7} className="text-center text-white">
            <h1 className="animate__animated animate__fadeInDown">
              Rent Your Dream Car Today!
            </h1>
            <p className="lead animate__animated animate__fadeInUp">
              Discover a wide range of private cars for every journey.<br />
              Fast booking, transparent pricing, and 24/7 support.
            </p>
            <Button
              variant="warning"
              size="lg"
              className="header-cta-btn animate__animated animate__pulse animate__infinite"
              onClick={() => navigate("/auth")}
            >
              <i className="bi bi-search"></i> Find a Rental Car Near You
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const HowItWorksSection = () => (
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

export default GuestHomePage;
