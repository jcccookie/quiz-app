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
  top: 100px;
`;

const StyledListGroup = styled(ListGroup)`
  cursor: pointer;
  margin-bottom: 15px;
`;

const StyledListGroupItem = styled(ListGroup.Item)`
  background-color: ${(props) => (props.check ? "#1e90ff" : "white")};
  color: ${(props) => (props.check ? "#f0f8ff" : "black")};
`;

function QuizPreview({ quiz }) {
  const [question, setQuestion] = useState([]);
  const [trueFalse, setTrueFalse] = useState([]);
  const [multiple, setMultiple] = useState([]);
  const [checkAll, setCheckAll] = useState([]);
  const [freeForm, setFreeForm] = useState([]);
  const [showTrueFalse, setShowTrueFalse] = useState(true);
  const [showMultiple, setShowMultiple] = useState(true);
  const [showCheckAll, setShowCheckAll] = useState(true);
  const [showFreeForm, setShowFreeForm] = useState(true);

  const { quizId } = useParams();

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
        <StyledListGroupItem
          check={showTrueFalse && showMultiple && showCheckAll && showFreeForm}
          onClick={handleShowAll}
        >
          All {`${question.length}`}
        </StyledListGroupItem>
        <StyledListGroupItem
          check={showTrueFalse}
          onClick={() => setShowTrueFalse(!showTrueFalse)}
        >
          True & False {`${trueFalse.length}`}
        </StyledListGroupItem>
        <StyledListGroupItem
          check={showMultiple}
          onClick={() => setShowMultiple(!showMultiple)}
        >
          Multiple Choice {`${multiple.length}`}
        </StyledListGroupItem>
        <StyledListGroupItem
          check={showCheckAll}
          onClick={() => setShowCheckAll(!showCheckAll)}
        >
          Check All That Apply {`${checkAll.length}`}
        </StyledListGroupItem>
        <StyledListGroupItem
          check={showFreeForm}
          onClick={() => setShowFreeForm(!showFreeForm)}
        >
          Free Form {`${freeForm.length}`}
        </StyledListGroupItem>
      </StyledListGroup>
      {showTrueFalse && (
        <>
          <h5 style={{ textAlign: "center" }}>True & False</h5>
          <QuestionTable rows={trueFalse} />
        </>
      )}
      {showMultiple && (
        <>
          <h5 style={{ textAlign: "center" }}>Multiple Choice</h5>
          <QuestionTable rows={multiple} />
        </>
      )}
      {showCheckAll && (
        <>
          <h5 style={{ textAlign: "center" }}>Check All That Apply</h5>
          <QuestionTable rows={checkAll} />
        </>
      )}
      {showFreeForm && (
        <>
          <h5 style={{ textAlign: "center" }}>Free Form</h5>
          <QuestionTable rows={freeForm} />
        </>
      )}
    </Container>
  );
}

export default QuizPreview;
