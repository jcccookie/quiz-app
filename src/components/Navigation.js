import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

function Navigation() {
  const handleLogoutButton = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_HOST}/logout`;
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Software Programming Quiz</Navbar.Brand>
        <Nav>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href={`${process.env.REACT_APP_SERVER_HOST}/auth/google`}>
            Sign In
          </Nav.Link>
          <Nav.Link onClick={handleLogoutButton}>Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
