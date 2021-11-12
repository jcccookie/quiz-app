import { Col, Row, Form } from "react-bootstrap";
import "../index.css";

function Emails(props) {
  return (
    <Row className="align-items-center">
      <Col>
        <Form.Control
          type="text"
          placeholder="Enter email"
          id={props.index + "t"}
          onChange={props.handleEmailChange}
        />
      </Col>
    </Row>
  );
}

export default Emails;
