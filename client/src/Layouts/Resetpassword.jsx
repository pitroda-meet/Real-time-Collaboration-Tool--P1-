import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Resetpassword = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      password: Password,
      confirmPassword: ConfirmPassword,
    };
    await dispatch(resetPassword(userData, navigate));

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>change Password</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Password "
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ConfirmPassword">
              <Form.Label>ConfirmPassword</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ConfirmPassword "
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loading…" : "update Password"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Resetpassword;
