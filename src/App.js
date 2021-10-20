import React from "react";
import axios from "axios";
import GoogleButton from "react-google-button";
import { Link, Route, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";

function App() {
  const handleGoogleLoginButton = () => {
    window.location.assign(
      // "https://quiz-user-329402.uc.r.appspot.com/auth/google"
      "http://localhost:8080/auth/google"
    );
  };

  const handleLogout = () => {
    axios.get("http://localhost:8080/logout");
  };

  return (
    <Switch>
      {["/", "/home", "/dashboard"].map((path) => (
        <Route key={path} exact path={path}>
          <Link to="/login">Login Page</Link>
          <Button onClick={handleLogout}>Logout</Button>
        </Route>
      ))}
      <Route exact path="/login">
        <GoogleButton onClick={handleGoogleLoginButton} />
      </Route>
      <Route exact path="/login/error">
        Login Error!
      </Route>
    </Switch>
  );
}

export default App;
