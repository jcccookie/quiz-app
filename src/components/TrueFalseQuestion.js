import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";

function TrueFalseQuestion(props) {
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    props.setQuestionAdded(true);
    props.setQuestionType(0);
  };

  const onClickCancel = (event) => {
    event.preventDefault();
    props.setQuestionType(0);
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
                  <Form.Control type="text" placeholder="Enter question" />
                </Form.Group>
                <Form.Check
                  type="radio"
                  label="True"
                  name="formHorizontalRadios"
                  id="true"
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name="formHorizontalRadios"
                  id="false"
                />
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
                      type="submit"
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
