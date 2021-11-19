import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function QuizResult({ results }) {
  const { quizId } = useParams();

  return (
    <Container>
      <h3 className="quizSent">Results</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quiz Title</th>
            <th>Quiz Rank</th>
            <th>Earned Points</th>
            <th>Total Points</th>
            <th>On Time</th>
          </tr>
        </thead>
        <tbody>
          {results
            ?.filter((result) => result.quizId === quizId)
            .map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result.name}</td>
                <td>{result.title}</td>
                <td>{result.rank}</td>
                <td>{result.credit}</td>
                <td>{result.points}</td>
                <td>{result.onTime ? "True" : "False"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default QuizResult;
