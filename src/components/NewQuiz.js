import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Home() {
  let { employee_id } = useParams();
  return (
    <Container className="content">
      <Row>
        <Col>
          <h1>Employee: {employee_id}</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter quiz title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTimeLimit">
              <Form.Label>Time Limit</Form.Label>
              <Form.Control placeholder="Enter quiz time limit in minutes" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Questions
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
