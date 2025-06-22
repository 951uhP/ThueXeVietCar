import { Button, Col, Form, Row } from "react-bootstrap";
import "./Login.scss";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { postLogin, postRegister } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginUser from "../../redux/action/userAction";

function Register() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    newPassword: "",
    confirmPassword: "",
    userType: "",
    agreeToTerms: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword) {
      console.log("Signing up with:", formData);
      let data = await postRegister(formData.email, formData.newPassword, formData.name, formData.phone, formData.userType);
      console.log(">>> register response: " + data.data)
      if (data && data.statusCode === 201) {
        handleLogin();
      }
    } else {
      alert("noooo");
      toast.error("Password do not match");
    }
  };

  const handleLogin = async (e) => {
    let data = await postLogin(formData.email, formData.newPassword);
    console.log(data.data);

    if (data && data.error === null) {
      //dispatch
     dispatch(loginUser(data.data));
      toast.success(data.message);

      // Điều hướng theo role
      const userRole = data.data?.user?.role?.name || data.data?.user?.role;
      if (userRole === "ADMIN") {
        navigate("/owner"); // Đường dẫn trang admin, bạn có thể đổi lại cho phù hợp
      } else if (userRole === "RENTER") {
        navigate("/"); // Trang chủ cho renter
      } else {
        navigate("/"); // Trang mặc định
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
        <Form.Group controlId="signupName" className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupEmail" className="mb-3">
          <Form.Label>Your email address</Form.Label>
          <div className="input-group">
            <Form.Control
              type="email"
              placeholder="Your email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupPhone" className="mb-3">
          <Form.Label>Your phone number</Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupPassword" className="mb-3">
          <Form.Label>Pick a password</Form.Label>
          <div className="input-group">
            <Form.Control
              type="password"
              placeholder="Pick a password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <Form.Text className="text-muted">
            Use at least one letter, one number, and seven characters.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <div className="input-group">
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <div className="select-row">
          <Form.Check
            type="radio"
            label="I want to rent a car"
            name="userType"
            value="RENTER"
            onChange={handleChange}
            className="mb-2"
            checked={formData.userType === "RENTER"}
          />
          <Form.Check
            type="radio"
            label="I am a car owner"
            name="userType"
            value="ADMIN"
            onChange={handleChange}
            className="mb-3"
            checked={formData.userType === "ADMIN"}
          />
        </div>
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
          onClick={handleSignup}
        >
          SIGN UP
        </Button>
      </Form>
    </div>
  );
}

export default Register;
