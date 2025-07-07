import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./Basic.scss";

const Basic = (props) => {
  const { formData, setFormData, onDocumentsChange } = props;

  const [documents, setDocuments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data: ", formData);
  };

  // Update documents
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedDocuments = [...documents, ...files];

    setDocuments(updatedDocuments);
    onDocumentsChange(updatedDocuments);
  };

  return (
    <Form className="basic-form" onSubmit={handleSubmit}>
      <h2>Basic Information</h2>
      <p>
        Note: Please check your information carefully, you'll not be able to
        change the basic details of your car, which is based on the registration
        information.
      </p>
      <div className="form-grid">
        <div>
          <div className="form-group">
            <label>License plate *</label>
            <Form.Control
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={setFormData}
              required
            />
          </div>
          <div className="form-group">
            <label>Color *</label>
            <Form.Select
              name="color"
              value={formData.color}
              onChange={setFormData}
            >
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
            </Form.Select>
          </div>
          <div className="form-group">
            <label>Brand name *</label>
            <Form.Control
              type="text"
              name="brand"
              value={formData.brand}
              onChange={setFormData}
              required
            />
          </div>
          <div className="form-group">
            <label>Model *</label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model}
              onChange={setFormData}
              required
            />
          </div>
          <div className="form-group">
            <label>Production year *</label>
            <Form.Control
              type="text"
              name="productionYear"
              value={formData.productionYear}
              onChange={setFormData}
              required
            />
          </div>
          <div className="form-group">
            <label>No. of seats *</label>
            <Form.Select
              name="numberOfSeats"
              value={formData.numberOfSeats}
              onChange={setFormData}
            >
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </Form.Select>
          </div>
        </div>

        {/* Phần Documents và Radio Buttons */}
        <div>
          <div className="radio-group-wrapper">
            <div className="radio-group">
              <label>Transmission *</label>
              <label>
                <Form.Check
                  type="radio"
                  name="transmissionType"
                  value="Automatic"
                  checked={formData.transmissionType === "Automatic"}
                  onChange={setFormData}
                  inline
                  label="Automatic"
                />
              </label>
              <label>
                <Form.Check
                  type="radio"
                  name="transmissionType"
                  value="Manual"
                  checked={formData.transmissionType === "Manual"}
                  onChange={setFormData}
                  inline
                  label="Manual"
                />
              </label>
            </div>

            <div className="radio-group">
              <label>Fuel *</label>
              <label>
                <Form.Check
                  type="radio"
                  name="fuelType"
                  value="Gasoline"
                  checked={formData.fuelType === "Gasoline"}
                  onChange={setFormData}
                  inline
                  label="Gasoline"
                />
              </label>
              <label>
                <Form.Check
                  type="radio"
                  name="fuelType"
                  value="Diesel"
                  checked={formData.fuelType === "Diesel"}
                  onChange={setFormData}
                  inline
                  label="Diesel"
                />
              </label>
            </div>
          </div>

          <div className="documents">
            <div className="upload-group">
              <label>Registration paper *</label>
              <Form.Control
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                multiple
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="upload-group">
              <label>Certificate of Inspection *</label>
              <Form.Control
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                multiple
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="upload-group">
              <label>Insurance *</label>
              <Form.Control
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                multiple
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Basic;
