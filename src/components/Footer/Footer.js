import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo51.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="bg-body-tertiary py-4">
      <Container className="footer-container">
        <Row className="align-items-start">
          <Col md={3}>
            <NavLink to={"/"} className="navbar-brand">
              <img
                src={Logo}
                width="70%"
                className="d-inline-block align-top mb-3"
                alt="Carental Logo"
              />
            </NavLink>
          </Col>

          <Col md={3}>
            <h5 className="footer-title">Rent Cars</h5>
            <Nav className="flex-column">
              <NavLink to={"/"} className=" nav-link ">
                Search Cars and Rates
              </NavLink>
            </Nav>
          </Col>

          <Col md={3}>
            <h5 className="footer-title">Customer Access</h5>
            <Nav className="flex-column">
              <NavLink to={"/manage-booking"} className=" nav-link ">
                Manage My Booking
              </NavLink>
              <NavLink to={"/wallet"} className=" nav-link ">
                My Wallet
              </NavLink>
              <NavLink to={"/car"} className=" nav-link ">
                My Car
              </NavLink>
              <NavLink to={"/login"} className=" nav-link ">
                Log In
              </NavLink>
            </Nav>
          </Col>

          <Col md={3}>
            <h5 className="footer-title">Join Us</h5>
            <Nav className="flex-column">
              <NavLink
                to={"http://localhost:3000/login"}
                className=" nav-link "
              >
                New User Sign Up
              </NavLink>
            </Nav>
          </Col>
        </Row>

        <Row className="text-center mt-4">
          <Col>
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} Carental - Cùng bạn đến mọi hành
              trình
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
