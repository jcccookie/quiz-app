import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useCookies } from "react-cookie";

function Navigation() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  const handleLogoutButton = () => {
    removeCookie("id");
    removeCookie("auth");
    window.location.href = `${process.env.REACT_APP_SERVER_HOST}/logout`;
  };

  const handleLoginButton = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_HOST}/auth/google`;
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Software Programming Quiz</Navbar.Brand>
        <Nav>
          <Nav.Link
            href={
              cookies.auth
                ? "/dashboard"
                : `${process.env.REACT_APP_SERVER_HOST}/auth/google`
            }
          >
            Dashboard
          </Nav.Link>
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
