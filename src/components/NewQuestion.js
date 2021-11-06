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

function NewQuestion(props) {
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

  return (
    <Container className="content">
      <Row>
        <Col>
          <Card>
            <Card.Header>Quiz Title: {props.title}</Card.Header>
            <Card.Body>
              <Card.Text>Time Limit: {props.timeLimit} minutes</Card.Text>
              <Card.Text>
                Current Number of Questions: {props.questions.length}
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
                  {!props.submitLoading && (
                    <Button
                      variant="success"
                      disabled={!props.questionAdded}
                      onClick={props.submitQuiz}
                    >
                      Submit Quiz
                    </Button>
                  )}
                  {props.submitLoading && (
                    <Button variant="success" type="submit">
                      <Spinner animation="border" role="status" size="sm" />
                    </Button>
                  )}
                </Col>
                <Col className="text-center">
                  {!props.deleteLoading && (
                    <Button variant="danger" onClick={props.deleteQuiz}>
                      Delete Quiz
                    </Button>
                  )}
                  {props.deleteLoading && (
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
