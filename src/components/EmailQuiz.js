import { Container } from "react-bootstrap";
import GetEmail from "./GetEmail";
import GetQuiz from "./GetQuiz";
import React, { useState } from "react";
// import { useParams, useHistory } from "react-router";
//import axios from "axios";

function Dashboard() {
  //   let history = useHistory();
  //   let { employee_id } = useParams();

  // state
  const [emails, setEmails] = useState([""]);
  const [form, setForm] = useState(1);
  const [quizID, setQuizID] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    setForm(4);
    const filteredEmails = emails.filter((email) => email.length > 2);
    console.log(filteredEmails);
    console.log(quizID);

    // setup email access to send link
    setForm(3);
  };

  return (
    <Container>
      {form === 1 && (
        <GetEmail emails={emails} setEmails={setEmails} setForm={setForm} />
      )}
      {form === 2 && (
        <GetQuiz
          setForm={setForm}
          setQuizID={setQuizID}
          submitHandler={submitHandler}
        />
      )}
      {form === 3 && <h1 className="quizSent">Emails Sent!</h1>}
      {form === 4 && <h1 className="quizSent">Loading...</h1>}
    </Container>
  );
}

export default Dashboard;
