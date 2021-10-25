import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Software Programming Quiz</Navbar.Brand>
        <Nav>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="http://localhost:8080/auth/google">Sign In</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
