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
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 50px;
  gap: 10px;
`;

const tempEmployeeId = 5092497743151104;

function Dashboard({ quiz, setQuiz, results, setResults }) {
  const [cookies, setCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [quiz, setQuiz] = useState([]);
  const { email, name, session } = useParams();
  const history = useHistory();
  // const [results, setResults] = useState([]);

  const cookieConfig = { path: "/", maxAge: 3600 };

  const rankEmployeeClientsByQuiz = (result) => {
    let tempResults = [...result];

    // sort results by quiz points
    // source: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    tempResults.sort((a, b) =>
      a.points > b.points ? 1 : b.points > a.points ? -1 : 0
    );

    // sort results by title
    // source: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    tempResults.sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );

    // add one if title has been seen
    if (tempResults.length > 1) {
      let prevQuizTitle = tempResults[0]["title"];
      for (let i = 1; i < tempResults.length; i++) {
        if (prevQuizTitle === tempResults[i]["title"]) {
          tempResults[i]["rank"] = tempResults[i - 1]["rank"] + 1;
        }
        prevQuizTitle = tempResults[i]["title"];
      }
    }

    setResults(tempResults);
  };

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
            rank: 1,
            quizId: data[j]["result"]["id"],
          };
          quizResults.push(results);
        }
      }
    }

    // rank the quiz takers by results
    rankEmployeeClientsByQuiz(quizResults);
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

  const deleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you wish to delete this quiz?")) {
      await axios
        .delete(`https://cs467quizcreation.wl.r.appspot.com/quiz/${quizId}`)
        .then((res) => {
          const filteredQuiz = quiz.filter((quiz) => quiz.id !== quizId);
          setQuiz(filteredQuiz);
        })
        .catch((err) => console.log(err));
    }
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
        <Button href={`/newQuiz/${cookies.id}`}>Create Quiz</Button>
        <Button href={`/emailQuiz/${cookies.id}`}>Email Quiz</Button>
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
                  <Button onClick={() => history.push(`/result/${quiz.id}`)}>
                    Quiz Result
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteQuiz(quiz.id)}>
                    Delete
                  </Button>
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
                <th>Quiz Rank</th>
                <th>Earned Points</th>
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
                  <td>{result.rank}</td>
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
