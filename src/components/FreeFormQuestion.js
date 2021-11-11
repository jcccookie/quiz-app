import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import "../index.css";
const axios = require("axios").default;

function FreeFormQuestion(props) {
  // state
  const [question, setQuestion] = useState("");
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  // on submit button for form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    // send post request to database to create new question
    const response = await axios({
      method: "post",
      url: "https://cs467quizcreation.wl.r.appspot.com/question",
      data: {
        type: 4,
        points: parseInt(points),
        question: question,
        answer: "",
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

  const pointsInputChangeHandler = (event) => {
    setPoints(event.target.value);
  };

  return (
    <Container className="question">
      <Row>
        <Col>
          <Card>
            <Card.Header>New Free Form Question</Card.Header>
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

export default FreeFormQuestion;
