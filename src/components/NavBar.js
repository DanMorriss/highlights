import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="highlights logo" height={45} />
          Highlights
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link><i className="fa-solid fa-house"></i>Home</Nav.Link>
            <Nav.Link><i className="fa-solid fa-sign-in-alt"></i>Sign in</Nav.Link>
            <Nav.Link><i class="fa-solid fa-user-plus"></i>Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
