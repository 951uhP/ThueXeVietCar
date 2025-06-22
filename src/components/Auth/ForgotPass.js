import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ForgotPass.scss";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email address is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert(
      "If this email address exists, we'll send an email with the link to reset your password."
    );
    navigate("/auth");
  };

  return (
    <Container className="forgot-pass-container">
      <Row className="forgot-pass-row">
        <Col md={6} className="forgot-pass-col">
          <h3>Reset Password</h3>
          <p>
            Enter the email address associated with your account, and we’ll
            email you with the link to reset your password.
          </p>
          <Form onSubmit={handleSendMail}>
            {error && <Alert variant="danger">{error}</Alert>}{" "}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="btn-submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPass;
