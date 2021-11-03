import {
  Container,
  Col,
  Row,
  Card,
  Button,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
const axios = require("axios").default;

function NewQuestion(props) {
  // for redirecting on submit quiz and delete quiz buttons
  let history = useHistory();

  // state
  const [loadingDelete, setLoadingDelete] = useState(false);

  // new True False Question
  function newTrueFalseQuestion() {
    props.setQuestionType(1);
  }

  // new multiple choice question
  function newMultipleChoiceQuestion() {
    props.setQuestionType(2);
  }

  // new check all that apply question
  function newCheckAllThatApplyQuestion() {
    props.setQuestionType(3);
  }

  // new free form question
  function newFreeFormQuestion() {
    props.setQuestionType(4);
  }

  // delete quiz when delete quiz button clicked - redirect to create quiz page
  const onClickDeleteQuiz = async () => {
    setLoadingDelete(true);
    // call DELETE request to api to delete quiz
    const deleteURL =
      "https://cs467quizcreation.wl.r.appspot.com/quiz/" + props.quizID;

    await axios({
      method: "delete",
      url: deleteURL,
    }).catch((error) => {
      console.log(error);
    });

    setLoadingDelete(false);

    // go back to home page after delete is done
    history.push("/");
  };

  return (
    <Container className="content">
      <Row>
        <Col>
          <Card>
            <Card.Header>Quiz Title: {props.title}</Card.Header>
            <Card.Body>
              <Card.Title>Quiz ID: {props.quizID}</Card.Title>
              <Card.Text>Time Limit: {props.timeLimit} minutes</Card.Text>
              <Card.Text>
                Current Number of Questions: {props.quiz["question"].length}
              </Card.Text>
              <Row>
                <Col className="text-center">
                  <DropdownButton
                    className="text-center"
                    variant="primary"
                    title="Add Question"
                  >
                    <Dropdown.Item eventKey="1" onClick={newTrueFalseQuestion}>
                      True/False
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={newMultipleChoiceQuestion}
                    >
                      Multiple Choice
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      onClick={newCheckAllThatApplyQuestion}
                    >
                      Check All That Apply
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={newFreeFormQuestion}>
                      Free Form
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
                <Col className="text-center">
                  <Button variant="success" disabled={!props.questionAdded}>
                    Submit Quiz
                  </Button>
                </Col>
                <Col className="text-center">
                  {!loadingDelete && (
                    <Button variant="danger" onClick={onClickDeleteQuiz}>
                      Delete Quiz
                    </Button>
                  )}
                  {loadingDelete && (
                    <Button variant="danger" type="submit">
                      <Spinner animation="border" role="status" size="sm" />
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NewQuestion;
