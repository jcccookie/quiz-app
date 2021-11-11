import { Col, Row, Form } from "react-bootstrap";
import "../index.css";

function MultipleChoiceAnswer(props) {
  return (
    <Row className="align-items-center">
      <Form.Label>Answers</Form.Label>
      <Col xs="auto">
        <Form.Check
          type="radio"
          name="group1"
          id={props.index + "c"}
          onChange={props.handleAnswerChange}
        />
      </Col>
      <Col>
        <Form.Control
          type="text"
          placeholder="Enter answer"
          id={props.index + "a"}
          onChange={props.handleAnswerChange}
        />
      </Col>
    </Row>
  );
}

export default MultipleChoiceAnswer;
