import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import NewQuiz from "./components/NewQuiz";
import EmailQuiz from "./components/EmailQuiz";
import FreeFormEvaluation from "./components/FreeFormEvaluation";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Container className="mainContent">
          {["/", "/home"].map((path) => (
            <Route key={path} exact path={path}>
              <Home />
            </Route>
          ))}
          <Route exact path="/dashboard/:email?/:name?/:session?">
            <Dashboard />
          </Route>
          <Route path="/employer/:employerId?/quiz/:quizId?/candidate/:candidateId?" component={FreeFormEvaluation} />
          <Route exact path="/login/error">
            Login Error!
          </Route>
          <Route path="/newQuiz/:employee_id" children={<NewQuiz />} />
          <Route path="/emailQuiz/:employee_id" children={<EmailQuiz />} />
        </Container>
      </Switch>
    </>
  );
}

export default App;
