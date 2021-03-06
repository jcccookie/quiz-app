import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function Navigation() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();

  const handleLogoutButton = () => {
    console.log("logout");
    removeCookie("auth");
    removeCookie("name");
    removeCookie("email");
    removeCookie("session");
    removeCookie("id");
    window.location.href = `${process.env.REACT_APP_SERVER_HOST}/logout`;
  };

  const handleLoginButton = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_HOST}/auth/google`;
  };

  const handleDashboardButton = () => {
    if (cookies.auth) {
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
          {cookies.auth ? (
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
