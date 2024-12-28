import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: Email,
    };
    await dispatch(forgotPassword(userData, navigate));

    setEmail("");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Forgot</h1>
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

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loading…" : "sent otp"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Forgot;
