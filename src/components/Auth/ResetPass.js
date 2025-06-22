import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ResetPass = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto text-center">
          <h3>Enter new password</h3>
          <p>Please set your new password</p>
          <Form>
            <Form.Group className="mb-3" controlId="formReset">
              <Form.Control type="password" placeholder="Pick a password" />
              <br></br>
              <p>Use at least one letter, one number and seven characters</p>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
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
            >
              <span role="img" aria-label="lock">
                🔒
              </span>{" "}
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPass;
