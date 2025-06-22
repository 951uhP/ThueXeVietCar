import React, { useState } from "react";
import "./Pricing.scss"; // Import file SCSS
import { Col, Row } from "react-bootstrap";

const Pricing = (props) => {
  const { formData, setFormData, setTerms, terms, otherDetail, setOtherDetail } = props;

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setTerms((prevTerms) => ({
      ...prevTerms,
      [name]: checked,
    }));
  };

  const handleOtherDetailsChange = (event) => {
    const { value } = event.target;
    setOtherDetail(value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name === "basePrice" || name === "deposit") {
      if (value < 0) return alert("Value cannot be negative");
    }
    setFormData(event);
  };

  return (
    <div className="pricing-container">
      <Row>
        <Col md={4}>
          <h3>Set base price for your car:</h3>
        </Col>
        <Col md={8}>
          <div className="input-group">
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleFormChange}
              min="0"
              step="1"
              pattern="^[0-9]"
              placeholder="0"
              className="input-field"
            />{" "}
            <div style={{ paddingTop: "6px", fontWeight: "bolder" }}>
              VND/day
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <h3>Required deposit:</h3>
        </Col>
        <Col md={8}>
          <div className="input-group">
            <input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleFormChange}
              min="0"
              step="1"
              pattern="^[0-9]"
              placeholder="0"
              className="input-field"
            />{" "}
            <div style={{ paddingTop: "6px", fontWeight: "bolder" }}>VND</div>
          </div>
        </Col>
      </Row>

      <h3>Terms of use</h3>
      <div className="terms-group">
        <label>
          <input
            checked={terms.noSmoking}
            type="checkbox"
            name="noSmoking"
            onChange={handleCheckboxChange}
          />{" "}
          No smoking
        </label>
        <label>
          <input
            checked={terms.noFood}
            type="checkbox"
            name="noFood"
            onChange={handleCheckboxChange}
          />{" "}
          No food in car
        </label>
        <label>
          <input type="checkbox" name="noPet" checked={terms.noPet} onChange={handleCheckboxChange} />{" "}
          No pet
        </label>
        <label>
          <input type="checkbox" name="other" checked={terms.other} onChange={handleCheckboxChange} />{" "}
          Other
        </label>
        {terms.other && (
          <textarea
            name="otherDetails"
            placeholder="Please specify..."
            className="textarea-field"
            onChange={handleOtherDetailsChange}
            value={otherDetail}
          ></textarea>
        )}
      </div>
    </div>
  );
}

export default Pricing;
