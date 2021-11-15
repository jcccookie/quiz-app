import React from "react";
import { useEffect, useState } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import styled from "styled-components";
const axios = require("axios").default;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

function Home() {
  let employee_id = "5092497743151104";
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getEmployeeClients() {
      let clients = await axios.get(
        "https://adroit-marking-328200.uc.r.appspot.com/employercandidates/" +
          employee_id
      );

      let quizResults = [];

      for (let i = 0; i < clients["data"].length; i++) {
        const res = await axios.get(
          "https://adroit-marking-328200.uc.r.appspot.com/candidate/" +
            clients["data"][i]
        );

        if (res["data"]["quizzes"] !== "") {
          const data = JSON.parse(res["data"]["quizzes"]);

          for (let j = 0; j < data.length; j++) {
            let results = {
              name: res["data"]["name"],
              title: data[j]["result"]["title"],
              credit: data[j]["result"]["credit"],
              points: data[j]["result"]["points"],
              onTime: data[j]["result"]["onTime"],
            };
            quizResults.push(results);
          }
        }
      }
      setResults(quizResults);
    }
    getEmployeeClients();
  }, []);

  return (
    <Container>
      <h1>Software Programming Quiz</h1>
      <h4>Sign to create your first quiz!</h4>
      {/* <Button href={`/newQuiz/${employee_id}`} className="text-uppercase">
        Create Quiz
      </Button>
      <Button href={`/emailQuiz/${employee_id}`} className="text-uppercase">
        Email Quiz
      </Button>
      <Col>
        <Row>
          <h3 className="quizSent">Quiz Results</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quiz Title</th>
                <th>Credit</th>
                <th>Total Points</th>
                <th>On Time</th>
              </tr>
            </thead>
            <tbody>
              {results?.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{result.name}</td>
                  <td>{result.title}</td>
                  <td>{result.credit}</td>
                  <td>{result.points}</td>
                  <td>{result.onTime ? "True" : "False"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Col> */}
    </Container>
  );
}

export default Home;
