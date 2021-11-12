import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Table, Button } from "react-bootstrap";
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

function Dashboard() {
  const [cookies, setCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const { email, name, session } = useParams();
  const history = useHistory();

  const cookieConfig = { path: "/", maxAge: 3600 };

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

      const quizLinks = employeeWithQuiz.data.quiz.map((quiz) =>
        axios.get(quiz.self)
      );
      const quizzes = (await Promise.all(quizLinks)).map((quiz) => quiz.data);
      console.log(quizzes);
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
    history.push("/dashboard"); // delete params in the address bar of the browser

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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Time Limit</th>
            <th># of Question</th>
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
                <Button variant="success" disabled={quiz.question.length === 0}>
                  Preview
                </Button>
              </td>
              <td>
                <Button variant="danger">Delete Quiz</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;
