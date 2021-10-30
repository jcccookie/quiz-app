import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
const axios = require("axios").default;

function TrueFalseQuestion(props) {
  // state
  const [question, setQuestion] = useState("");
  const [points, setPoints] = useState(0);
  const [questionAnswer, setQuestionAnswer] = useState(false);

  // on submit button for form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    // send post request to database to create new question
    const response = await axios({
      method: "post",
      url: "https://cs467quizcreation.wl.r.appspot.com/question",
      data: {
        type: 1,
        points: parseInt(points),
        question: question,
        answer: questionAnswer,
      },
    }).catch((error) => {
      console.log(error);
    });

    console.log(response.data);

    // once post request is complete - reset the form
    props.setQuestionAdded(true);
    props.setQuestionType(0);
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

  const radioButtonInputHandler = (event) => {
    setQuestionAnswer(true);
  };

  const pointsInputChangeHandler = (event) => {
    setPoints(event.target.value);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>New True/False Question</Card.Header>
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
                <Form.Check
                  type="radio"
                  label="True"
                  name="formHorizontalRadios"
                  id="true"
                  required
                  onChange={radioButtonInputHandler}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name="formHorizontalRadios"
                  id="false"
                />
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
                    <Button
                      className="text-center"
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
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

export default TrueFalseQuestion;
