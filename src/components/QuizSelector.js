import { Col, Row, Form } from "react-bootstrap";
import "../index.css";

function QuizSelector(props) {
  return (
    <Row className="align-items-center">
      <Col xs="auto">
        <Form.Check
          type="radio"
          name="group1"
          id={props.quiz.id}
          onChange={props.handleSelectionChange}
          label={
            "Title: " +
            props.quiz.title +
            ", Questions: " +
            props.quiz.question.length +
            ", Time Limit: " +
            props.quiz.timeLimit +
            " minutes"
          }
        />
      </Col>
    </Row>
  );
}

export default QuizSelector;
