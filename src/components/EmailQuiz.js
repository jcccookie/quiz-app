import { Container } from "react-bootstrap";
import GetEmail from "./GetEmail";
import GetQuiz from "./GetQuiz";
import React, { useState } from "react";
import { useParams } from "react-router";
import emailjs from "emailjs-com";
import axios from "axios";

function Dashboard() {
  //   let history = useHistory();
  let { employee_id } = useParams();

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

    // get candidate IDs for POST request
    const candidateResponse = await axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url:
        "https://adroit-marking-328200.uc.r.appspot.com/employercandidates/" +
        employee_id,
      data: filteredEmails,
    }).catch((error) => {
      console.log(error);
    });

    // iterate through candidates data
    const candidates = candidateResponse["data"];
    for (const candidate in candidates) {
      // candidate ID for Ryan API
      let candidateID = candidates[candidate];

      // link for candidate to take quiz
      let url =
        "https://adroit-marking-328200.uc.r.appspot.com/employer/" +
        employee_id +
        "/quiz/" +
        quizID +
        "/candidate/" +
        candidateID;

      // send email to that condidate
      emailjs
        .send(
          "service_1hksa7o",
          "template_9xmxynr",
          {
            quizurl: url,
            toemail: candidate,
          },
          "user_SRz0vpwIuUAmwJ94flLa3"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }

    // once done sending tell user email has been sent
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
      {form === 3 && <h1 className="quizSent">Email Sent!</h1>}
      {form === 4 && <h1 className="quizSent">Loading...</h1>}
    </Container>
  );
}

export default Dashboard;
