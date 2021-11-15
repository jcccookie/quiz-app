import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Table, Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { checkSession } from "../helpers/session";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CreateDiv = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const tempEmployeeId = 4652586724491264;

function Dashboard({ quiz, setQuiz }) {
  const [cookies, setCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [quiz, setQuiz] = useState([]);
  const { email, name, session } = useParams();
  const history = useHistory();
  const [results, setResults] = useState([]);

  const cookieConfig = { path: "/", maxAge: 3600 };

  // get quiz results for the results table
  const getEmployeeClients = async (employee_id) => {
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
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      await checkSession();

      const employee = await axios
        .post("https://cs467quizcreation.wl.r.appspot.com/employee", {
          email: cookies.email ? cookies.email : email,
          name: cookies.name ? cookies.name : name,
        })
        .catch((err) => console.error(err));

      setCookie("id", employee.data.id, cookieConfig);

      const employeeWithQuiz = await axios.get(
        `https://cs467quizcreation.wl.r.appspot.com/employee/${employee.data.id}`
        // `https://cs467quizcreation.wl.r.appspot.com/employee/${tempEmployeeId}`
      );

      // get quiz results data
      await getEmployeeClients(employee.data.id);

      const quizLinks = employeeWithQuiz.data.quiz.map((quiz) =>
        axios.get(quiz.self)
      );
      const quizzes = (await Promise.all(quizLinks)).map((quiz) => quiz.data);
      setQuiz(quizzes);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    name && setCookie("name", name, cookieConfig);
    email && setCookie("email", email, cookieConfig);
    session && setCookie("session", session, cookieConfig);
    setCookie("auth", true, cookieConfig);

    if (name && email && session) {
      history.push("/dashboard"); // delete params in the address bar of the browser
    }

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <CreateDiv>
        <Button href={`/newQuiz/${cookies.id}`} className="text-uppercase">
          Create Quiz
        </Button>
      </CreateDiv>
      {quiz.length === 0 ? (
        <div>No Quiz to Show</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Time Limit</th>
              <th># of Question</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quiz?.map((quiz, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{quiz.title}</td>
                <td>{quiz.timeLimit}</td>
                <td>{quiz.question.length}</td>
                <td>
                  <Button
                    variant="success"
                    disabled={quiz.question.length === 0}
                    onClick={() => history.push(`/preview/${quiz.id}`)}
                  >
                    Preview
                  </Button>
                </td>
                <td>
                  <Button href={`/emailQuiz/${cookies.id}`}>Email Quiz</Button>
                </td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
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
      </Col>
    </Container>
  );
}

export default Dashboard;
