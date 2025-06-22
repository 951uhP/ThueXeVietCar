import React, { useState, useEffect } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { Col, Container, Row } from "react-bootstrap";
import "../components/Auth/Login.scss";
import LoadingIcon from "../components/Loading";

function AuthPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <Container className="p-4 auth-container">
      <br />
      <br />
      <Row>
        <Col md={5} className="d-flex flex-column">
          <Login />
        </Col>
        <Col
          md={1}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="divider"></div>
        </Col>
        <Col md={6} className="d-flex flex-column">
          <Register />
        </Col>
      </Row>
      <br />
      <br />
    </Container>
  );
}

export default AuthPage;
