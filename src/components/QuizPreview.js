import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import styled from "styled-components";
import QuestionTable from "./QuestionTable";

const QUESTION_TYPE = {
  trueFalse: 1,
  multiple: 2,
  checkAll: 3,
  freeForm: 4,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 100px;
`;

const StyledListGroup = styled(ListGroup)`
  cursor: pointer;
`;

function QuizPreview({ quiz }) {
  const [question, setQuestion] = useState([]);
  const [trueFalse, setTrueFalse] = useState([]);
  const [multiple, setMultiple] = useState([]);
  const [checkAll, setCheckAll] = useState([]);
  const [freeForm, setFreeForm] = useState([]);
  const [showTrueFalse, setShowTrueFalse] = useState(false);
  const [showMultiple, setShowMultiple] = useState(false);
  const [showCheckAll, setShowCheckAll] = useState(false);
  const [showFreeForm, setShowFreeForm] = useState(false);

  const { quizId } = useParams();

  console.log(question);
  console.log(trueFalse);
  console.log(multiple);
  console.log(checkAll);
  console.log(freeForm);

  const handleShowAll = () => {
    setShowTrueFalse(true);
    setShowMultiple(true);
    setShowCheckAll(true);
    setShowFreeForm(true);
  };

  useEffect(() => {
    let question;
    quiz.forEach((quiz) => {
      if (quiz.id === quizId) {
        setQuestion(quiz.question);
        question = quiz.question;
      }
    });

    let tempTrueFalse = [];
    let tempMultiple = [];
    let tempCheckAll = [];
    let tempFreeForm = [];

    if (question) {
      question.forEach((question) => {
        if (question.type === QUESTION_TYPE.trueFalse) {
          tempTrueFalse = [...tempTrueFalse, question];
        } else if (question.type === QUESTION_TYPE.multiple) {
          tempMultiple = [...tempMultiple, question];
        } else if (question.type === QUESTION_TYPE.checkAll) {
          tempCheckAll = [...tempCheckAll, question];
        } else if (question.type === QUESTION_TYPE.freeForm) {
          tempFreeForm = [...tempFreeForm, question];
        }
      });
    }
    setTrueFalse([...trueFalse, ...tempTrueFalse]);
    setMultiple([...multiple, ...tempMultiple]);
    setCheckAll([...checkAll, ...tempCheckAll]);
    setFreeForm([...freeForm, ...tempFreeForm]);
  }, []);

  return (
    <Container>
      <StyledListGroup horizontal>
        <ListGroup.Item onClick={handleShowAll}>
          All {`${question.length}`}
        </ListGroup.Item>
        <ListGroup.Item onClick={() => setShowTrueFalse(!showTrueFalse)}>
          True & False {`${trueFalse.length}`}
        </ListGroup.Item>
        <ListGroup.Item onClick={() => setShowMultiple(!showMultiple)}>
          Multiple Choice {`${multiple.length}`}
        </ListGroup.Item>
        <ListGroup.Item onClick={() => setShowCheckAll(!showCheckAll)}>
          Check All That Apply {`${checkAll.length}`}
        </ListGroup.Item>
        <ListGroup.Item onClick={() => setShowFreeForm(!showFreeForm)}>
          Free Form {`${freeForm.length}`}
        </ListGroup.Item>
      </StyledListGroup>
      {showTrueFalse && <QuestionTable rows={trueFalse} />}
      {showMultiple && <QuestionTable rows={multiple} />}
      {showCheckAll && <QuestionTable rows={checkAll} />}
      {showFreeForm && <QuestionTable rows={freeForm} />}
    </Container>
  );
}

export default QuizPreview;
