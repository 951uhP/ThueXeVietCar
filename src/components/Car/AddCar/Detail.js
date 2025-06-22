import React, { useState } from "react";
import "./Detail.scss"; // Import file SCSS cho styling
import { Col, Row } from "react-bootstrap";

const Detail = (props) => {
  const { formData, setFormData, onImagesChange, handleCheckboxChange, addFunc, setCarImages, setPreviewImage } = props;

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name === "mileage" || name === "fuelConsumption") {
      if (value < 0) return alert("Value cannot be negative");
    }
    setFormData(event);
  };

  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Chuyển FileList thành mảng
    console.log(files);
    setCarImages((prevState) => ({
      ...prevState,
      [e.target.name]: files[0] || null,
    }));

    const fileURL = URL.createObjectURL(files[0]);
    setPreviewImage(fileURL);

  }

  return (
    <form className="detail-form">
      <h2>Vehicle Details</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Mileage *</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleFormChange}
            min="0"
            step="1"
            pattern="^[0-9]"
            required
          />
        </div>
        <div className="form-group">
          <label>Fuel consumption</label>
          <Row>
            <Col md={9}>
              <input
                type="number"
                name="fuelConsumption"
                value={formData.fuelConsumption}
                onChange={handleFormChange}
                min="0"
              />
            </Col>
            <Col md={3} style={{ textAlign: "left", paddingTop: "11px" }}>
              <h6>L/100km</h6>
            </Col>
          </Row>
        </div>
        <div className="form-group full-width">
          <label>Address *</label>
          <input
            type="text"
            name="address"
            placeholder="House number, Street"
            value={formData.address}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <h3>Additional Functions</h3>
      <div className="form-grid">
        {[
          { name: "bluetooth", label: " Bluetooth" },
          { name: "gps", label: " GPS" },
          { name: "camera", label: " Camera" },
          { name: "sunRoof", label: " Sun Roof" },
          { name: "childLock", label: " Child Lock" },
          { name: "childSeat", label: " Child Seat" },
          { name: "dvd", label: " DVD" },
          { name: "usb", label: " USB" },
        ].map((item) => (
          <label key={item.name}>
            <input
              type="checkbox"
              name={item.name}
              checked={addFunc[item.name]}
              onChange={handleCheckboxChange}
            />
            {item.label}
          </label>
        ))}
      </div>

      <h3>Images</h3>
      <div className="form-grid images-grid">
        {["front", "back", "left", "right"].map((field) => (
          <div className="upload-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              name={field}
              onChange={handleFileChange}
              required
            />
          </div>
        ))}
      </div>
      <p className="note">Please include full 4 images of your vehicle (Front, Back, Left, Right).</p>
    </form>
  );
};

export default Detail;
