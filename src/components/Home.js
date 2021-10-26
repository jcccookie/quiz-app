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
  let employee_id = "12345";
  let extension = "/newQuiz/" + employee_id;

  return (
    <Container>
      <h1>Create your first quiz!</h1>
      <Button href={extension} className="text-uppercase">
        Create Quiz
      </Button>
    </Container>
  );
}

export default Home;
