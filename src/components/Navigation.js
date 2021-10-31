import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navbar, Container, Nav } from "react-bootstrap";

function Navigation() {
  const { user } = useContext(UserContext);

  const handleLogoutButton = () => {
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
              user.auth
                ? "/dashboard"
                : `${process.env.REACT_APP_SERVER_HOST}/auth/google`
            }
          >
            Dashboard
          </Nav.Link>
          {user.auth ? (
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
