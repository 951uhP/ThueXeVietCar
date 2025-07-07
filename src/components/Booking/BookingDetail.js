import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./BookingDetail.scss";

const BookingDetail = (props) => {
  const { carDetail, imageURLs, requestRenter, setRequestRenter } = props;

  // Format số tiền hiển thị
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toDisplayDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleChangeRenter = (e) => {
    const { name, value } = e.target;
    setRequestRenter({
      ...requestRenter,
      [name]: value,
    });
  };

  return (
    <div className="booking-detail">
      <Row className="car-info mb-4">
        <Col md={4}>
          <div className="car-image shadow-sm">
            <img src={imageURLs[0]} alt="Car" className="img-fluid" />
          </div>
        </Col>
        <Col md={8}>
          <h4 className="mb-2">{carDetail.name}</h4>
          
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
        </Col>
      </Row>

      <Form className="p-3 rounded bg-white shadow-sm">
        <h5 className="mb-3 text-primary">Renter Information</h5>
        <Row>
          <Col md={6}>
            <Form.Group controlId="renterFullName">
              <Form.Label>Full Name</Form.Label>
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
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                required
                name="dateOfBirth"
                placeholder="dd-mm-yyyy"
                value={toDisplayDate(requestRenter.dateOfBirth)}
                onChange={handleChangeRenter}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="renterPhone">
              <Form.Label>Phone Number</Form.Label>
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
              <Form.Label>Email</Form.Label>
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
              <Form.Label>National ID</Form.Label>
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
              <Form.Label>Driving License</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter driving license number"
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
              <Form.Label>Address</Form.Label>
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
      </Form>
    </div>
  );
};

export default BookingDetail;
