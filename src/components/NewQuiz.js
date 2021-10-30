import { Container, Col, Row } from "react-bootstrap";
// import { useParams } from "react-router-dom";
import { useState } from "react";
import NewQuizBasicInfoForm from "./NewQuizBasicInfoForm";
import NewQuestion from "./NewQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";

function NewQuiz() {
  // let { employee_id } = useParams();

  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [quizID, setQuizID] = useState("");
  const [questionAdded, setQuestionAdded] = useState(false);
  const [questionType, setQuestionType] = useState(0);
  const [quiz, setQuiz] = useState([]);

  return (
    <Container className="question">
      <Row>
        <Col>
          {quizID.length === 0 ? (
            <NewQuizBasicInfoForm
              title={title}
              timeLimit={timeLimit}
              setTitle={setTitle}
              setTimeLimit={setTimeLimit}
              setQuizID={setQuizID}
              setQuiz={setQuiz}
            />
          ) : (
            <NewQuestion
              title={title}
              timeLimit={timeLimit}
              quizID={quizID}
              setQuestionType={setQuestionType}
              questionAdded={questionAdded}
              quiz={quiz}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          {questionType === 1 && (
            <TrueFalseQuestion
              setQuestionAdded={setQuestionAdded}
              setQuestionType={setQuestionType}
              quizID={quizID}
              setQuiz={setQuiz}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default NewQuiz;
