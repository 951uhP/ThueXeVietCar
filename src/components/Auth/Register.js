import { Button, Col, Form, Row } from "react-bootstrap";
import "./Login.scss";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { postLogin, postRegister } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginUser from "../../redux/action/userAction";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Thêm dòng này

function Register() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phoneNo: "", // đổi từ phone sang phoneNo
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    nationalIdNo: "",
    address: "",
    drivingLicense: "",
    wallet: 0,
    role: "RENTER",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = React.useState(false); // Thêm state này
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false); // Thêm state này
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name is required and must be at least 2 characters.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.phoneNo) {
      newErrors.phoneNo = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Phone number must be 10 digits.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (
      formData.password.length < 7 ||
      !/[A-Za-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password = "Password must be at least 7 characters, include a letter and a number.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    }

    if (!formData.nationalIdNo) {
      newErrors.nationalIdNo = "National ID is required.";
    } else if (!/^[0-9]{9,12}$/.test(formData.nationalIdNo)) {
      newErrors.nationalIdNo = "National ID must be 9-12 digits.";
    }

    if (!formData.address) {
      newErrors.address = "Address is required.";
    }

    if (!formData.drivingLicense) {
      newErrors.drivingLicense = "Driving license is required.";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (formData.password === formData.confirmPassword) {
      let data = await postRegister(
        formData.email,
        formData.password,
        formData.name,
        formData.phoneNo,
        formData.role,
        formData.wallet,
        formData.dateOfBirth,
        formData.nationalIdNo,
        formData.address,
        formData.drivingLicense
      );
      if (data && data.statusCode === 201) {
        handleLogin();
      }
    } else {
      toast.error("Password do not match");
    }
  };

  const handleLogin = async () => {
    let data = await postLogin(formData.email, formData.password);
    if (data && data.error === null) {
      dispatch(loginUser(data.data));
      toast.success("Login successful!");

      const userRole = data.data?.user?.role?.name || data.data?.user?.role;
      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "RENTER") {
        navigate("/");
      } else {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="register-container">
      <h4>NOT A MEMBER YET?</h4>
      <Form onSubmit={handleSignup}>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group controlId="signupName" className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group controlId="signupEmail" className="mb-3">
              <Form.Label>Your email address</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="signupPhone" className="mb-3">
              <Form.Label>Your phone number</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Your phone number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                />
                {errors.phoneNo && <div className="text-danger">{errors.phoneNo}</div>}
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="signupDateOfBirth" className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
                {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="signupNationalIdNo" className="mb-3">
              <Form.Label>National ID No.</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="National ID Number"
                  name="nationalIdNo"
                  value={formData.nationalIdNo}
                  onChange={handleChange}
                  required
                />
                {errors.nationalIdNo && <div className="text-danger">{errors.nationalIdNo}</div>}
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="signupAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Your address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && <div className="text-danger">{errors.address}</div>}
              </div>
            </Form.Group>
          </Col>
        </Row>



        <Form.Group controlId="signupDrivingLicense" className="mb-3">
          <Form.Label>Driving License</Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Driving License"
              name="drivingLicense"
              value={formData.drivingLicense}
              onChange={handleChange}
              required
            />
            {errors.drivingLicense && <div className="text-danger">{errors.drivingLicense}</div>}
          </div>
        </Form.Group>
        <Form.Group controlId="signupPassword" className="mb-3">
          <Form.Label>Pick a password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Pick a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="input-group-text eye-icon-container"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <Form.Text className="text-muted">
            Use at least one letter, one number, and seven characters.
          </Form.Text>
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="input-group-text eye-icon-container"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
        </Form.Group>
        <div className="select-row">
          <Form.Check
            type="checkbox"
            label="I have read and agree with the Terms and Conditions"
            name="agreeToTerms"
            onChange={handleChange}
            checked={formData.agreeToTerms}
            className="mb-3"
          />
          <a href="/terms" className="terms-link">
            Terms of Use
          </a>
          {errors.agreeToTerms && <div className="text-danger">{errors.agreeToTerms}</div>}
        </div>
        <Button
          style={{
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "0.8rem 1.6rem",
            transition: "all 0.3s ease",
          }}
          variant="warning"
          type="submit"
          className="custom-btn w-100"
          disabled={!formData.agreeToTerms}
        >
          SIGN UP
        </Button>
      </Form>
    </div>
  );
}

export default Register;
