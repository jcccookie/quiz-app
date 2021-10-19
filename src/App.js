import React from "react";
import GoogleButton from "react-google-button";
import { Link, Route, Switch } from "react-router-dom";

function App() {
  const handleGoogleLoginButton = () => {
    window.location.assign(
      // "https://quiz-user-329402.uc.r.appspot.com/auth/google"
      "http://localhost:8080/auth/google"
    );
  };

  return (
    <Switch>
      <Route exact path="/">
        This is Home
        <Link to="/login">Login Page</Link>
      </Route>
      <Route exact path="/login">
        <GoogleButton onClick={handleGoogleLoginButton} />
      </Route>
      <Route exact path="/dashboard">
        This is dashboard
      </Route>
    </Switch>
  );
}

export default App;
