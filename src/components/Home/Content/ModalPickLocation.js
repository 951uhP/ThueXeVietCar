import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import "./ModalPickLocation.scss";

const provinces = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
  "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau",
  "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai",
  "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương",
  "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang",
  "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
  "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
  "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La",
  "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang",
  "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

// Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function ModalPickLocation(props) {
  const { show, setShow, setLocationSelected } = props;
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredProvinces = provinces.filter((province) => {
    const input = removeVietnameseTones(query.trim().toLowerCase());
    const provinceName = removeVietnameseTones(province.toLowerCase());
    return provinceName.includes(input) && input !== "";
  });

  const handleSubmit = () => {
    if (query.trim()) {
      setLocationSelected(query.trim());
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectProvince = (province) => {
    setQuery(province);
    setLocationSelected(province);
    setShowDropdown(false);
    handleClose();
  };

  const handleClose = () => {
    setShowDropdown(false);
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      size="lg"
      centered
      className="modal-search-location"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select your location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3 search-input" style={{ position: "relative" }}>
          <Col xs={12}>
            <Form.Control
              type="text"
              placeholder="Enter your location"
              value={query}
              onChange={handleInputChange}
              autoComplete="off"
            />
            {showDropdown && filteredProvinces.length > 0 && (
              <div
                className="dropdown-province"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "0 0 8px 8px",
                  maxHeight: 220,
                  overflowY: "auto",
                }}
              >
                {filteredProvinces.map((province, idx) => (
                  <div
                    key={province}
                    className="dropdown-item"
                    style={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      borderBottom:
                        idx !== filteredProvinces.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                    onClick={() => handleSelectProvince(province)}
                  >
                    {province}
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-loca" onClick={handleSubmit} variant="primary">
          Submit
        </Button>
        <Button
          className="btn-date"
          onClick={handleClose}
          variant="outline-secondary"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPickLocation;
