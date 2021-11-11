import { Container } from "react-bootstrap";
import GetEmail from "./GetEmail";
import React, { useState } from "react";
// import { useParams, useHistory } from "react-router";
//import axios from "axios";

function Dashboard() {
  //   let history = useHistory();
  //   let { employee_id } = useParams();

  // state
  const [emails, setEmails] = useState([""]);
  const [form, setForm] = useState(1);

  return (
    <Container>
      {form === 1 && (
        <GetEmail emails={emails} setEmails={setEmails} setForm={setForm} />
      )}
      {form === 2 && <h1>Get Quiz</h1>}
    </Container>
  );
}

export default Dashboard;
