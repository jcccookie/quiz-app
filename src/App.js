import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";

function App() {
  const handleLogoutButton = () => {
    axios
      .get("http://localhost:8080/logout")
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navigation />
      <Switch>
        {["/", "/home", "/dashboard"].map((path) => (
          <Route key={path} exact path={path}>
            <Dashboard />
          </Route>
        ))}
        <Route exact path="/login/error">
          Login Error!
        </Route>
      </Switch>
    </>
  );
}

export default App;
