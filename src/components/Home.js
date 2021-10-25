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
  return (
    <Container>
      <h1>Create your first quiz!</h1>
      <Button className="text-uppercase">Create Quiz</Button>
    </Container>
  );
}

export default Home;
