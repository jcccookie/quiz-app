import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizSelector from "./QuizSelector";
import "../index.css";
const axios = require("axios").default;

function GetQuiz(props) {
  // employee_id params
  let { employee_id } = useParams();

  // state
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);

  const getEmployeeAndQuizzes = async () => {
    setLoading(true);
    const employeeResponse = await axios.get(
      `https://cs467quizcreation.wl.r.appspot.com/employee/${employee_id}`
    );

    const quizLinks = employeeResponse.data.quiz.map((quiz) =>
      axios.get(quiz.self)
    );
    const quizzes = (await Promise.all(quizLinks)).map((quiz) => quiz.data);
    setQuizzes(quizzes);
    setLoading(false);
  };

  const handleSelectionChange = (event) => {
    const targetID = event.target.id;
    props.setQuizID(targetID);
  };

  useEffect(() => {
    getEmployeeAndQuizzes();
  }, []);

  return (
    <Container>
      {loading && <h1 className="quizSubmitted">Loading...</h1>}
      {!loading && (
        <Container className="getEmail">
          <Row>
            <Col>
              <Card>
                <Card.Header>Quizzes</Card.Header>
                <Card.Body>
                  <Form onSubmit={props.submitHandler}>
                    <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Label>Select Quiz</Form.Label>
                    </Form.Group>
                    {quizzes.map((quiz, index) => {
                      return (
                        <QuizSelector
                          key={quiz.id.toString()}
                          quiz={quiz}
                          handleSelectionChange={handleSelectionChange}
                        />
                      );
                    })}
                    <br />
                    <Col className="text-center">
                      <Button variant="primary" type="submit">
                        Email Quiz
                      </Button>
                    </Col>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default GetQuiz;
