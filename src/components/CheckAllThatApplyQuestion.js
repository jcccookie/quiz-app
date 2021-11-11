import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import CheckAllThatApplyAnswer from "./CheckAllThatApplyAnswer";
import "../index.css";
const axios = require("axios").default;

function CheckAllThatApplyQuestion(props) {
  // starting answer object
  let startingAnswers = [{ answer: "", correct: false }];

  // state
  const [question, setQuestion] = useState("");
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState(startingAnswers);
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // on submit button for form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const filteredAnswers = answer.filter(
      (answer) => answer["answer"].length !== 0
    );

    if (filteredAnswers.length === 0) {
      console.log("no answers");
      props.setQuestionType(0);
      setLoading(false);
    } else {
      // send post request to database to create new question
      const response = await axios({
        method: "post",
        url: "https://cs467quizcreation.wl.r.appspot.com/question",
        data: {
          type: 3,
          points: parseInt(points),
          question: question,
          answer: filteredAnswers,
        },
      }).catch((error) => {
        console.log(error);
      });

      // add question to questions state
      const { id } = response["data"];
      let newQuestions = [...props.questions];
      newQuestions.push(id);
      props.setQuestions(newQuestions);

      // once post request is complete - reset the form
      props.setQuestionAdded(true);
      props.setQuestionType(0);
      setLoading(false);
    }
  };

  // on clicking cancel button in form
  const onClickCancel = (event) => {
    event.preventDefault();
    props.setQuestionType(0);
  };

  // set question state when question is typed in
  const questionInputChangeHandler = (event) => {
    setQuestion(event.target.value);
  };

  // set points when points are typed in
  const pointsInputChangeHandler = (event) => {
    setPoints(event.target.value);
  };

  // set answer when an answer changes
  const handleAnswerChange = (event) => {
    // get index of answer being changed
    const index = event.target.id[0];

    // if checkbox has been updated - update that in answer object
    if (event.target.id[1] === "c") {
      const newAnswer = [...answer];
      newAnswer[index]["correct"] = event.target.checked;
      setAnswer(newAnswer);

      // else answer has been updated - update that in answer object
    } else {
      const newAnswer = [...answer];
      newAnswer[index]["answer"] = event.target.value;
      setAnswer(newAnswer);

      // see if new answer line needs to be added
      const finalIndex = answer.length - 1;
      if (answer[finalIndex]["answer"].length !== 0) {
        const addAnswer = [...answer, { answer: "", correct: false }];
        setAnswer(addAnswer);
      }
    }
  };

  // make sure not all questions are empty
  const allAnswersEmpty = () => {
    const filteredAnswers = answer.filter(
      (answer) => answer["answer"].length !== 0
    );

    if (filteredAnswers.length === 0) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  };

  useEffect(() => {
    allAnswersEmpty();
  });

  return (
    <Container className="question">
      <Row>
        <Col>
          <Card>
            <Card.Header>New Check All That Apply Question</Card.Header>
            <Card.Body>
              <Form onSubmit={formSubmissionHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter question"
                    required
                    onChange={questionInputChangeHandler}
                  />
                </Form.Group>
                <br />
                {answer.map((ans, index) => {
                  return (
                    <CheckAllThatApplyAnswer
                      key={index.toString()}
                      index={index}
                      handleAnswerChange={handleAnswerChange}
                      answer={answer}
                    />
                  );
                })}
                <Form.Group className="mb-3" controlId="formTimeLimit">
                  <Form.Label>Points</Form.Label>
                  <Form.Control
                    onChange={pointsInputChangeHandler}
                    placeholder="Points"
                    required
                    type="number"
                    min="0"
                  />
                </Form.Group>
                <Row>
                  <Col className="text-center">
                    {!loading && (
                      <Button
                        className="text-center"
                        variant="primary"
                        type="submit"
                        disabled={submitDisabled}
                      >
                        Submit
                      </Button>
                    )}

                    {loading && (
                      <Button variant="primary" type="submit">
                        <Spinner animation="border" role="status" size="sm" />
                      </Button>
                    )}
                  </Col>
                  <Col className="text-center">
                    <Button
                      variant="warning"
                      type="button"
                      onClick={onClickCancel}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckAllThatApplyQuestion;
