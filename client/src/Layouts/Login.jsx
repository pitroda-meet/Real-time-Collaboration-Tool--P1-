import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [Password, setPassword] = useState();
  const [Email, setEmail] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      password: Password,
      email: Email,
    };
    await dispatch(login(userData, navigate));
    setPassword("");
    setEmail("");
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter EMail Address"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loading…" : "sign in"}
            </Button>

            <div className="col-12 text-center">
              <p className="small mb-0">
                Don't have an account?{" "}
                <Link to="/signup" className="fw-semibold text-decoration-none">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="col-12 text-center">
              <p className="small mb-0">
                Forgot password?{" "}
                <Link to="/forgot" className="fw-semibold text-decoration-none">
                  Reset Password
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
