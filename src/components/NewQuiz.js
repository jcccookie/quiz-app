import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NewQuizBasicInfoForm from "./NewQuizBasicInfoForm";
import NewQuestion from "./NewQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import FreeFormQuestion from "./FreeFormQuestion";
import CheckAllThatApplyQuestion from "./CheckAllThatApplyQuestion";
import { useHistory } from "react-router-dom";
import "../index.css";
const axios = require("axios").default;

function NewQuiz() {
  let history = useHistory();
  let { employee_id } = useParams();

  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [questionAdded, setQuestionAdded] = useState(false);
  const [questionType, setQuestionType] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [basicInfoComplete, setBasicInfoComplete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const submitQuiz = async () => {
    // call POST request to api to make quiz
    const postQuizResponse = await axios({
      method: "post",
      url: "https://cs467quizcreation.wl.r.appspot.com/quiz",
      data: {
        employee: employee_id,
        timeLimit: timeLimit,
        title: title,
        question: [],
      },
    }).catch((error) => {
      console.log(error);
    });

    // setQuizID to newly returned id
    console.log(postQuizResponse["data"]["id"]);

    // add all questions to quiz
    for (let i = 0; i < questions.length; i++) {
      const res = await axios({
        method: "post",
        url:
          "https://cs467quizcreation.wl.r.appspot.com/quiz/" +
          postQuizResponse["data"]["id"] +
          "/question/" +
          questions[i],
      }).catch((error) => {
        console.log(error);
      });
      console.log(res["data"]);
    }
  };

  // delete quiz when delete quiz button clicked - redirect to create quiz page
  const deleteQuiz = async () => {
    setDeleteLoading(true);
    // delete all questions currently created to be added to quiz
    for (let i = 0; i < questions.length; i++) {
      await axios({
        method: "delete",
        url:
          "https://cs467quizcreation.wl.r.appspot.com/question/" + questions[i],
      }).catch((error) => {
        console.log(error);
      });
    }

    setDeleteLoading(false);

    // go back to home page after delete is done
    history.push("/");
  };

  return (
    <Container className="content">
      <Row>
        <Col>
          {!basicInfoComplete === 0 ? (
            <NewQuizBasicInfoForm
              title={title}
              timeLimit={timeLimit}
              setTitle={setTitle}
              setTimeLimit={setTimeLimit}
              setBasicInfoComplete={setBasicInfoComplete}
            />
          ) : (
            <NewQuestion
              title={title}
              timeLimit={timeLimit}
              setQuestionType={setQuestionType}
              questionAdded={questionAdded}
              submitQuiz={submitQuiz}
              questions={questions}
              deleteQuiz={deleteQuiz}
              deleteLoading={deleteLoading}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          {questionType === 1 && (
            <TrueFalseQuestion
              setQuestionAdded={setQuestionAdded}
              setQuestionType={setQuestionType}
              setQuestions={setQuestions}
              questions={questions}
            />
          )}
          {questionType === 3 && (
            <CheckAllThatApplyQuestion
              setQuestionAdded={setQuestionAdded}
              setQuestionType={setQuestionType}
              setQuestions={setQuestions}
              questions={questions}
            />
          )}
          {questionType === 4 && (
            <FreeFormQuestion
              setQuestionAdded={setQuestionAdded}
              setQuestionType={setQuestionType}
              setQuestions={setQuestions}
              questions={questions}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default NewQuiz;
