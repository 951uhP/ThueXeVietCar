import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkEmailExistAPI } from "../../service/apiService";
import "./ForgotPass.scss";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkEmailExist = async (e) => {
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
    setMessage("");
    setLoading(true);

    try {
      const response = await checkEmailExistAPI(email);
      console.log(response);
      if (response) {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setError("Email does not exist.");
      }
    } catch (error) {
      console.error("Error in checkEmailExist:", error);
    }
    setLoading(false);
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

          <Form onSubmit={checkEmailExist}>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPass;
