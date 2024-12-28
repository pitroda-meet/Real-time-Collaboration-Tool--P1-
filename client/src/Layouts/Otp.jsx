import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { otp } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [Otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      otp: Otp,
    };
    await dispatch(otp(userData, navigate));

    setOtp("");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Otp</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Otp">
              <Form.Label>Otp</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Otp "
                value={Otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loading…" : "submit otp"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Otp;
