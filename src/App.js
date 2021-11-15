import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import NewQuiz from "./components/NewQuiz";
import EmailQuiz from "./components/EmailQuiz";
import QuizPreview from "./components/QuizPreview";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [quiz, setQuiz] = useState([]);

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
            <Dashboard quiz={quiz} setQuiz={(quizzes) => setQuiz(quizzes)} />
          </Route>
          <Route exact path="/login/error">
            Login Error!
          </Route>
          <Route path="/newQuiz/:employee_id" children={<NewQuiz />} />
          <Route path="/emailQuiz/:employee_id" children={<EmailQuiz />} />
          <Route exact path="/preview/:quizId">
            <QuizPreview quiz={quiz} />
          </Route>
        </Container>
      </Switch>
    </>
  );
}

export default App;
