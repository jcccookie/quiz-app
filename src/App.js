import React from "react";
import axios from "axios";

import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import NewQuiz from "./components/NewQuiz";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

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
        <Container>
          {["/", "/home"].map((path) => (
            <Route key={path} exact path={path}>
              <Home />
            </Route>
          ))}
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login/error">
            Login Error!
          </Route>
          <Route path="/newQuiz/:employee_id" children={<NewQuiz />} />
        </Container>
      </Switch>
    </>
  );
}

export default App;
