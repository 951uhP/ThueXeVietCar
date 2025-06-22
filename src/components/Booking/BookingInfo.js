import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const bookingInfo = (props) => {
  const { handleSearch, pickupDate, dropoffDate, location } = props;

  const styles = {
    container: {
      backgroundColor: "#555",
      color: "#fff",
      padding: "1rem",
      borderRadius: "8px",
      position: "relative",
    },
    editButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      color: "#fff",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    editIcon: {
      marginLeft: "5px",
    },
  };


  return (
    <Container style={styles.container}>
      <Row>
        <Col>
          <h5>Booking Details</h5>
          <ul>
            <li>
              <strong>Pick-up location:</strong> {location}
            </li>
            <li>
              <strong>Pick-up date and time:</strong>{" "}
              {pickupDate}
            </li>
            <li>
              <strong>Return date and time:</strong>{" "}
              {dropoffDate}
            </li>
          </ul>
        </Col>
      </Row>
      <Button style={styles.editButton} onClick={handleSearch}>
        Change details
        <FaEdit style={styles.editIcon} />
      </Button>
    </Container>
  );
};

export default bookingInfo;
