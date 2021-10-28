import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
const axios = require("axios").default;

function NewQuizBasicInfoForm(props) {
  let { employee_id } = useParams();

  const titleInputChangeHandler = (event) => {
    props.setTitle(event.target.value);
  };

  const timeLimitInputChangeHandler = (event) => {
    props.setTimeLimit(event.target.value);
  };

  const formSubmissionHandlerBasicInformation = async (event) => {
    event.preventDefault();

    // call POST request to api to make quiz
    const response = await axios({
      method: "post",
      url: "https://cs467quizcreation.wl.r.appspot.com/quiz",
      data: {
        employee: employee_id,
        timeLimit: props.timeLimit,
        title: props.title,
        question: [],
      },
    }).catch((error) => {
      console.log(error);
    });

    // set quizID to id returned from POST request
    props.setQuizID(response["data"]["id"]);
  };

  return (
    <Container className="content">
      <Row>
        <Col>
          <Form onSubmit={formSubmissionHandlerBasicInformation}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={titleInputChangeHandler}
                type="text"
                placeholder="Quiz title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTimeLimit">
              <Form.Label>Time Limit (minutes)</Form.Label>
              <Form.Control
                onChange={timeLimitInputChangeHandler}
                placeholder="Time Limit"
                required
                type="number"
                min="1"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Questions
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewQuizBasicInfoForm;
