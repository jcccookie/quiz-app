import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

function Home() {
  let employee_id = "5660188736487424";

  return (
    <Container>
      <h1>Create your first quiz!</h1>
      <Button href={`/newQuiz/${employee_id}`} className="text-uppercase">
        Create Quiz
      </Button>
      <Button href={`/emailQuiz/${employee_id}`} className="text-uppercase">
        Email Quiz
      </Button>
    </Container>
  );
}

export default Home;
