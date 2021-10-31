import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
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
  const { user } = useContext(UserContext);

  let employee_id = "5660188736487424";

  return (
    <Container>
      <h1>Create your first quiz!</h1>
      <Button
        href={
          user.auth
            ? `/newQuiz/${employee_id}`
            : `${process.env.REACT_APP_SERVER_HOST}/auth/google`
        }
        className="text-uppercase"
      >
        Create Quiz
      </Button>
    </Container>
  );
}

export default Home;
