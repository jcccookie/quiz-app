import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NewQuizBasicInfoForm from "./NewQuizBasicInfoForm";
import NewQuestion from "./NewQuestion";

function NewQuiz() {
  let { employee_id } = useParams();

  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [quizID, setQuizID] = useState("");

  return (
    <Container className="content">
      <Row>
        <Col>
          <h1>Employee: {employee_id}</h1>
          {quizID.length === 0 ? (
            <NewQuizBasicInfoForm
              title={title}
              timeLimit={timeLimit}
              setTitle={setTitle}
              setTimeLimit={setTimeLimit}
              setQuizID={setQuizID}
            />
          ) : (
            <NewQuestion title={title} timeLimit={timeLimit} quizID={quizID} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default NewQuiz;
