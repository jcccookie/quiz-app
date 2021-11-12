import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function Navigation() {
  const history = useHistory();

  const handleLogoutButton = () => {
    console.log("logout");
    Cookies.remove("auth");
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("session");
    Cookies.remove("id");
    window.location.href = `${process.env.REACT_APP_SERVER_HOST}/logout`;
  };

  const handleLoginButton = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_HOST}/auth/google`;
  };

  const handleDashboardButton = () => {
    if (Cookies.get("auth")) {
      history.push("/dashboard");
    } else {
      window.location.href = `${process.env.REACT_APP_SERVER_HOST}/auth/google`;
    }
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Software Programming Quiz</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={handleDashboardButton}>Dashboard</Nav.Link>
          {Cookies.get("auth") ? (
            <Nav.Link onClick={handleLogoutButton}>Log Out</Nav.Link>
          ) : (
            <Nav.Link onClick={handleLoginButton}>Sign In</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
