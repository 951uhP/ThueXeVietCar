import React, { useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

const Payment = (props) => {
  const { carDetail, requestBody, setRequestBody, wallet, nODay } = props;
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentSelection = (event) => {
    setPaymentMethod(event.target.value);
    setRequestBody({
      ...requestBody, [event.target.name]: event.target.value
    });
    //console.log(event.target.value);
  };


  // Format số tiền hiển thị
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div>
      <h4>Step 2: Payment</h4>
      <Row className="mb-4">
        <Col md={4}>
          <h5>{carDetail.name}</h5>
          <p>Price: {formatCurrency(carDetail?.basePrice || 0)}/day</p>
          <p>Location: {carDetail.address}</p>
          <p style={{ color: "green" }}>Status: Available</p>
        </Col>
        <Col md={4}>
          <h5>Booking Summary</h5>
          <p>Number of days: {nODay}</p>
          <p>Price per day: {formatCurrency(carDetail?.basePrice || 0)} VND</p>
          <p>Total: {formatCurrency(carDetail?.basePrice * nODay || 0)}</p>
          <p>Deposit: {formatCurrency(carDetail?.deposit || 0)}</p>
        </Col>
        <Col md={4}></Col>
      </Row>
      <Row>
        <Col md={6}>
          <h5>Please select your payment method</h5>
          <Form>
            <Form.Check
              type="radio"
              id="my-wallet"
              name="paymentMethod"
              value="wallet"
              label={
                <>
                  My wallet <br />
                  <span style={{ color: "green" }}>
                    Current balance: {formatCurrency(wallet || 0)}
                  </span>
                </>
              }
              onChange={handlePaymentSelection}
            />
            {/* <Form.Check
              type="radio"
              id="cash"
              name="paymentMethod"
              label={
                <>
                  Cash <br />
                  <span style={{ fontStyle: "italic" }}>
                    Our operator will contact you for further instructions
                  </span>
                </>
              }
              value="Cash"
              onChange={handlePaymentSelection}
            /> */}
            <Form.Check
              type="radio"
              id="bank-transfer"
              name="paymentMethod"
              value="vnpay"
              label={
                <>
                  Bank transfer <br />
                  <span style={{ fontStyle: "italic" }}>
                    Pay by VNPAY
                  </span>
                </>
              }
              onChange={handlePaymentSelection}
            />
          </Form>
        </Col>
      </Row>

      <div className="d-flex justify-content-between mt-4"></div>

      <p className="mt-3" style={{ fontStyle: "italic" }}>
        The deposit amount will be deducted from your wallet.
      </p>
    </div>
  );
};

export default Payment;
