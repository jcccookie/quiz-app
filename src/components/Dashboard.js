import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Table, Button } from "react-bootstrap";
import styled from "styled-components";

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
  const [cookies, setCookie] = useCookies(["userId"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const employee = await axios
        .post("https://cs467quizcreation.wl.r.appspot.com/employee", {
          email: cookies.email,
          name: cookies.name,
        })
        .catch((err) => console.error(err));

      const cookieConfig = { path: "/", maxAge: 36000 };

      setCookie("id", employee.data.id, cookieConfig);

      const employeeWithQuiz = await axios.get(
        // `https://cs467quizcreation.wl.r.appspot.com/employee/${employee.data.id}`
        `https://cs467quizcreation.wl.r.appspot.com/employee/${tempEmployeeId}`
      );

      const quizLinks = employeeWithQuiz.data.quiz.map((quiz) =>
        axios.get(quiz.self)
      );

      const quizzes = (await Promise.all(quizLinks)).map((quiz) => quiz.data);

      localStorage.setItem("quiz", JSON.stringify(quizzes));
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("quiz") === null) {
      fetchUser();
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Container>
      <CreateDiv>
        <Button href={`/newQuiz/${tempEmployeeId}`} className="text-uppercase">
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
          {JSON.parse(localStorage.getItem("quiz"))?.map((quiz, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{quiz.title}</td>
              <td>{quiz.timeLimit}</td>
              <td>{quiz.question.length}</td>
              <td>
                <Button variant="success" disabled={quiz.question.length === 0}>
                  Edit Question
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
