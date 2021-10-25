import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Home() {
  let { employee_id } = useParams();
  return (
    <div className="App">
      <Container className="content">
        <h1>Create Quiz</h1>
        <p>employee id: {employee_id}</p>
      </Container>
    </div>
  );
}

export default Home;
