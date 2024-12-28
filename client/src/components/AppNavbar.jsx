import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap"; // Import LinkContainer
import { logout } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function AppNavbar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {userInfo ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <LinkContainer to="/signup">
                <Nav.Link eventKey={2} href="#memes">
                  sign up
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
