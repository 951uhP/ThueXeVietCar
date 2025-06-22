import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./BookingDetail.scss";

const BookingDetail = (props) => {
  const { carDetail, requestBody, setRequestBody, imageURLs, requestRenter, requestDriver, setRequestDriver, setRequestRenter } = props;
  const [isDifferentDriver, setIsDifferentDriver] = useState(false);

  const handleChangeRenter = (e) => {
    const { name, value } = e.target;
    setRequestRenter({
      ...requestRenter,
      [name]: value,
    });
  };

  const handleChangeDriver = (e) => {
    const { name, value } = e.target;
    setRequestDriver({
      ...requestDriver,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setIsDifferentDriver(e.target.checked);
    console.log(requestRenter);
  };

  // Format số tiền hiển thị
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="booking-detail">
      <Row className="car-info mb-4">
        <Col md={4}>
          <div className="car-image">
            <img src={imageURLs[0]} alt="Car" className="img-fluid" />
          </div>
        </Col>
        <Col md={8}>
          <h4>{carDetail.name}</h4>
          <p>No. of rides: 0</p>
          <p>Price: {formatCurrency(carDetail.basePrice)}/day</p>
          <p>Location: {carDetail.address}</p>
        </Col>
      </Row>

      {/* Form thông tin */}
      <Form>
        <h5>Renter's Information</h5>
        <Row>
          <Col md={6}>
            <Form.Group controlId="renterFullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                value={requestRenter.fullName}
                type="text"
                placeholder="Enter full name"
                name="fullName"
                onChange={handleChangeRenter}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="renterDob">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                required
                name="dateOfBirth"
                value={requestRenter.dateOfBirth}
                onChange={handleChangeRenter}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="renterPhone">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                required
                name="phoneNumber"
                value={requestRenter.phoneNumber}
                onChange={handleChangeRenter}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="renterEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                name="email"
                value={requestRenter.email}
                onChange={handleChangeRenter}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="renterNationalId">
              <Form.Label>National ID No.:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter national ID"
                required
                name="nationalId"
                value={requestRenter.nationalId}
                onChange={handleChangeRenter}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="renterLicense">
              <Form.Label>Driving License:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter driving license"
                required
                name="drivingLicense"
                value={requestRenter.drivingLicense}
                onChange={handleChangeRenter}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="renterAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                placeholder="City/Province, District, Ward, Street"
                required
                name="address"
                value={requestRenter.address}
                onChange={handleChangeRenter}
              />
            </Form.Group>
          </Col>
        </Row>

        <h5>Driver's Information</h5>
        <Form.Group controlId="differentDriver">
          <Form.Check
            type="checkbox"
            label="Different than Renter's information"
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group controlId="driverFullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                name="fullName"
                type="text"
                placeholder="Enter full name"
                disabled={!isDifferentDriver}
                value={requestDriver.fullName}
                onChange={handleChangeDriver}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="driverDob">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                disabled={!isDifferentDriver}
                value={requestDriver.dateOfBirth}
                onChange={handleChangeDriver}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="driverPhone">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                disabled={!isDifferentDriver}
                value={requestDriver.phoneNumber}
                onChange={handleChangeDriver}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="driverEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                disabled={!isDifferentDriver}
                value={requestDriver.email}
                onChange={handleChangeDriver}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="driverNationalId">
              <Form.Label>National ID No.:</Form.Label>
              <Form.Control
                type="text"
                name="nationalId"
                placeholder="Enter national ID"
                disabled={!isDifferentDriver}
                value={requestDriver.nationalId}
                onChange={handleChangeDriver}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="driverLicense">
              <Form.Label>Driving License:</Form.Label>
              <Form.Control
                type="text"
                name="drivingLicense"
                placeholder="Enter driving license"
                disabled={!isDifferentDriver}
                value={requestDriver.drivingLicense}
                onChange={handleChangeDriver}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="driverAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="City/Province, District, Ward, Street"
                disabled={!isDifferentDriver}
                value={requestDriver.address}
                onChange={handleChangeDriver}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BookingDetail;
