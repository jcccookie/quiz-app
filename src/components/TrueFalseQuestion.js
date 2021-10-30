import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";

function TrueFalseQuestion(props) {
  // state
  const [question, setQuestion] = useState("");
  const [radioButton, setRadioButton] = useState(false);

  // on submit button for form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    props.setQuestionAdded(true);
    props.setQuestionType(0);
    console.log(question);
    console.log(radioButton);
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
    setRadioButton(true);
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
