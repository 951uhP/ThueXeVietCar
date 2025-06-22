import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { postConfirmBooking2 } from "../service/apiService";
import { toast } from "react-toastify";

const ThanksForPayingPage = () => {
  const [message, setMessage] = useState("");
  const [thanks, setThanks] = useState("");
  const [orderId, setOrderId] = useState("");

  // Gửi trạng thái giao dịch về backend để cập nhật
  const updatePaymentStatus = async (paramsObject) => {

    try {
      const response = await postConfirmBooking2(orderId, paramsObject)

      if (response.data.bookingStatus === "Payment Paid" || response.data.bookingStatus === "Deposit Paid" || response.data.bookingStatus === "Refund Paid") {
        setMessage("Payment status updated successfully!");
        setThanks("Thank You!");
      } else {
        setThanks("Failed!");
        setMessage("Payment cancel");
      }
      toast.success("Update payment status success");
    } catch (error) {
      console.error("Error updating payment status:", error);
      setMessage("An error occurred while updating payment status.");
      setThanks("Error");
      toast.error("Update payment status failed");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramsObject = {};
    queryParams.forEach((value, key) => {
      paramsObject[key] = value;
      if (key.includes("vnp_OrderInfo")) {
        setOrderId(value);
      }
      if (key.includes("wallet_OrderInfo")) {
        setOrderId(value);
      }
    });


    updatePaymentStatus(paramsObject);

  }, [message]);



  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", paddingBottom: "50px" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto text-center">
          <h3>{thanks}</h3>
          <p>{message}</p>
          <p>
            We appreciate your trust in our service. You can now enjoy the car
            you've booked. If you have any questions or need support, feel free
            to contact us.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              window.location.href = "/list-car";
            }}
            style={{
              backgroundColor: "#ffc107",
              color: "black",
              fontStyle: "bolder",
              border: "none",
            }}
          >
            <span role="img" aria-label="car">
              🚗
            </span>{" "}
            Go to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ThanksForPayingPage;
