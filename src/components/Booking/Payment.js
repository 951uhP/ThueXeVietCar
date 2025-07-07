import React, { useState } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import "./Payment.scss";

const Payment = (props) => {
  const { carDetail, requestBody, setRequestBody, wallet, nODay } = props;
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentSelection = (event) => {
    setPaymentMethod(event.target.value);
    setRequestBody({
      ...requestBody, [event.target.name]: event.target.value
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="payment-page">
      <h4 className="mb-4">Step 2: Payment</h4>
      <Row className="justify-content-center mb-4">
        <Col lg={8} md={10}>
          <Card className="car-info-card mb-4">
            <Card.Body className="d-flex flex-column flex-md-row align-items-center">
              <div
                className="car-image mb-3 mb-md-0 me-md-4"
                style={{
                  flex: "0 0 360px",
                  width: 360,
                  maxWidth: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {carDetail.images && carDetail.images.length > 0 && (
                  <img
                    src={`http://localhost:9999${carDetail.images[0]}`}
                    alt={carDetail.name}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      background: "#f8f9fa",
                      border: "1.5px solid #eee"
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, width: "100%", textAlign: "left", alignItems: 'start' }}>
                <h5 className="car-title">{carDetail.name}</h5>
                <div className="fw-bold text-success">
                  Deposit: {formatCurrency(carDetail.deposit)}
                </div>
                <div className="fw-bold text-warning">
                  Base Price: {formatCurrency(carDetail.basePrice)}/day
                </div>
                <div className="mb-2">
                  <i className="bi bi-geo-alt-fill text-danger"></i>
                  <span className="ms-1">{carDetail.address}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="gy-4">
        <Col md={6}>
          <Card className="summary-card h-100">
            <Card.Body>
              <h5>Booking Summary</h5>
              <div className="summary-row">
                <span>Number of days:</span>
                <span>{nODay}</span>
              </div>
              <div className="summary-row">
                <span>Price per day:</span>
                <span>{formatCurrency(carDetail?.basePrice || 0)}</span>
              </div>
              <div className="summary-row">
                <span>Total:</span>
                <span className="total">{formatCurrency(carDetail?.basePrice * nODay || 0)}</span>
              </div>
              <div className="summary-row">
                <span>Deposit:</span>
                <span>{formatCurrency(carDetail?.deposit || 0)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="payment-method-card h-100">
            <Card.Body>
              <h5><i className="bi bi-credit-card-2-front-fill"></i> Please select your payment method</h5>
              <Form>
                <Form.Check
                  type="radio"
                  id="my-wallet"
                  name="paymentMethod"
                  value="wallet"
                  label={
                    <>
                      <span className="pay-icon"><i className="bi bi-wallet2"></i></span>
                      My wallet <br />
                      <span style={{ color: "green" }}>
                        Current balance: {formatCurrency(wallet || 0)}
                      </span>
                    </>
                  }
                  onChange={handlePaymentSelection}
                  checked={paymentMethod === "wallet"}
                  className="mb-3 pay-radio"
                  style={{ textAlign: "left" }}
                />
                <Form.Check
                  type="radio"
                  id="bank-transfer"
                  name="paymentMethod"
                  value="vnpay"
                  label={
                    <>
                      <span className="pay-icon"><i className="bi bi-bank"></i></span>
                      Bank transfer <br />
                      <span style={{ fontStyle: "italic" }}>
                        Pay by VNPAY
                      </span>
                    </>
                  }
                  onChange={handlePaymentSelection}
                  checked={paymentMethod === "vnpay"}
                  className="pay-radio"
                  style={{ textAlign: "left" }}
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <p className="mt-4 payment-note">
        <i className="bi bi-info-circle"></i> The deposit amount will be deducted from your wallet.
      </p>
    </div>
  );
};

export default Payment;
