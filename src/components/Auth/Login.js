import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.scss";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/action/userAction.js';
import { Link } from "react-router-dom";
import { postLogin, postRegister } from "../../service/apiService.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let data = await postLogin(formData.email, formData.password);
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

  return (
    <Container>
      <Row>
        <h4>LOG IN USING YOUR ACCOUNT</h4>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="loginEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <div className="input-group">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="loginPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Link to="/forgot" className="forgot-password-link">
            Forgot Password?
          </Link>

          <br />
          <br />

          <Button
            style={{
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              padding: "0.8rem 1.6rem"
            }}
            variant="warning"
            type="submit"
            className="w-100 custom-btn"
          >
            LOG IN
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
