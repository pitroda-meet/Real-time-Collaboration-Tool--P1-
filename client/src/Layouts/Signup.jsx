import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: Name,
      password: Password,
      phone: Phone,
      email: Email,
    };
    await dispatch(register(userData, navigate));
    setName("");
    setPassword("");
    setPhone("");
    setEmail("");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Sign</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter  name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
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

            <Form.Group controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter EMail Address"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone "
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loading…" : "sign up"}
            </Button>
            <p className="mt-3 text-secondary text-center">
              Existing user?{" "}
              <Link to="/login" className="link-primary text-decoration-none">
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
