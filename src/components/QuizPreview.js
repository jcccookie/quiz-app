import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import styled from "styled-components";

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

    if (question) {
      question.forEach((question) => {
        if (question.type === QUESTION_TYPE.trueFalse) {
          !trueFalse.length && setTrueFalse([...trueFalse, question]);
        } else if (question.type === QUESTION_TYPE.multiple) {
          !multiple.length && setMultiple([...multiple, question]);
        } else if (question.type === QUESTION_TYPE.checkAll) {
          !checkAll.length && setCheckAll([...checkAll, question]);
        } else if (question.type === QUESTION_TYPE.freeForm) {
          !freeForm.length && setFreeForm([...freeForm, question]);
        }
      });
    }
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
      {showTrueFalse && <div>TF</div>}
      {showMultiple && <div>Multiple</div>}
      {showCheckAll && <div>Check</div>}
      {showFreeForm && <div>FreeForm</div>}
    </Container>
  );
}

export default QuizPreview;
