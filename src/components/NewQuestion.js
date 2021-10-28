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
  function newTrueFalseQuestion() {
    console.log("new true false question");
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
                    <Dropdown.Item eventKey="2">Multiple Choice</Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                      Check All That Apply
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="4">Free Form</Dropdown.Item>
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
