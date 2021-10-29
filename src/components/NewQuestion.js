import {
  Container,
  Col,
  Row,
  Card,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

function NewQuestion(props) {
  // new True False Question
  function newTrueFalseQuestion() {
    console.log("new true false question");
  }

  // new multiple choice question
  function newMultipleChoiceQuestion() {
    console.log("new multiple choice question");
  }

  // new check all that apply question
  function newCheckAllThatApplyQuestion() {
    console.log("new check all that apply question");
  }

  // new free form question
  function newFreeFormQuestion() {
    console.log("new free form question");
  }

  return (
    <Container className="content">
      <Row>
        <Col>
          <Card>
            <Card.Header>Quiz Title: {props.title}</Card.Header>
            <Card.Body>
              <Card.Title>Quiz ID: {props.quizID}</Card.Title>
              <Card.Text>Time Limit: {props.timeLimit} minutes</Card.Text>
              <Row>
                <Col className="text-center">
                  <DropdownButton
                    className="text-center"
                    variant="primary"
                    title="Add New Question"
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
                  <Button variant="success">Submit Quiz</Button>
                </Col>
                <Col className="text-center">
                  <Button variant="danger">Delete Quiz</Button>
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
