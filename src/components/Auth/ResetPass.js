import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPass = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 7 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must be at least 7 characters, include a letter and a number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:9999/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });
      const data = await response.text();
      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/auth"), 2000);
      } else {
        setError(data || "Failed to reset password.");
      }
    } catch (err) {
      setError("Failed to reset password.");
    }
    setLoading(false);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto text-center">
          <h3>Enter new password</h3>
          <p>Please set your new password</p>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form.Group className="mb-3" controlId="formReset">
              <Form.Control
                type="password"
                placeholder="Pick a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>Use at least one letter, one number and seven characters</p>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#ffc107",
                color: "black",
                fontStyle: "bold",
                border: "none",
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <span role="img" aria-label="lock">
                    🔒
                  </span>{" "}
                  Submit
                </>
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPass;
