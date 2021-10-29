import {
  Container,
  Col,
  Row,
  Form,
  Button,
} from "react-bootstrap";

function TrueFalseQuestion(props) {
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    props.setQuestionAdded(true);
    props.setQuestionType(0);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formSubmissionHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Question</Form.Label>
              <Form.Control type="text" placeholder="Enter question" />
            </Form.Group>
            <Form.Check
              type="radio"
              label="true"
              name="formHorizontalRadios"
              id="true"
            />
            <Form.Check
              type="radio"
              label="false"
              name="formHorizontalRadios"
              id="false"
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TrueFalseQuestion;
