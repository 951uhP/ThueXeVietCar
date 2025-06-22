import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Finish = (props) => {
  const { carDetail, bookingResponse, pickupDate, dropoffDate } = props

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container className="text-center">
      <h4>You’ve successfully booked {carDetail.name}</h4>
      <p>
        From <strong>{pickupDate}</strong> to{" "}
        <strong>{dropoffDate}</strong>.
      </p>
      <p>
        Your booking number is: <strong>{bookingResponse.id}</strong>
      </p>
      <p>Our operator will contact you with further guidance about pickup.</p>

      <div className="mt-4">
        <Button
          variant="link"
          href="/"
          style={{ textDecoration: "underline", marginRight: "1px" }}
        >
          Go to homepage
        </Button>
        <Button
          variant="secondary"
          href="/car-list"
          style={{
            backgroundColor: "#ffc107",
            color: "#333",
            border: "none",
            marginRight: "10px",
          }}
        >
          Book another car
        </Button>
        <Button
          variant="primary"
          href="/view-booking"
          style={{
            backgroundColor: "white",
            color: "#333",
            border: "1pt solid #333",
          }}
        >
          View Booking
        </Button>
      </div>
    </Container>
  );
};

export default Finish;
