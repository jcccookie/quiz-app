import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Emails from "./Emails";
import "../index.css";

function GetEmail(props) {
  // state
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // on submit button for form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    console.log(props.emails);
  };

  // set answer when an answer changes
  const handleEmailChange = (event) => {
    // get index of answer being changed
    const index = event.target.id[0];

    // update the email being changed
    const newEmails = [...props.emails];
    newEmails[index] = event.target.value;
    props.setEmails(newEmails);

    // see if new answer line needs to be added
    const finalIndex = props.emails.length - 1;
    if (props.emails[finalIndex].length !== 0) {
      const addEmail = [...props.emails, ""];
      props.setEmails(addEmail);
    }
  };

  // make sure not all emails are empty
  const allEmailsEmptyAndValid = () => {
    const filteredEmails = props.emails.filter((email) => email.length !== 0);

    if (filteredEmails.length === 0) {
      setSubmitDisabled(true);
      return;
    }

    // check if emails are email addresses
    let allEmailsValid = 0;
    for (let email of filteredEmails) {
      if (!validateEmail(email)) {
        setSubmitDisabled(true);
        return;
      } else {
        allEmailsValid++;
      }
    }

    // if so - make submit button available
    if (allEmailsValid === filteredEmails.length) {
      setSubmitDisabled(false);
    }
  };

  useEffect(() => {
    allEmailsEmptyAndValid();
  });

  // regex email validation
  // source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Container className="getEmail">
      <Row>
        <Col>
          <Card>
            <Card.Header>Email Addresses</Card.Header>
            <Card.Body>
              <Form onSubmit={formSubmissionHandler}>
                {props.emails.map((email, index) => {
                  return (
                    <Container>
                      <Emails
                        key={index.toString()}
                        index={index}
                        handleEmailChange={handleEmailChange}
                        email={email}
                      />
                      <br />
                    </Container>
                  );
                })}
                <Row>
                  <Col className="text-center">
                    <Button
                      className="text-center"
                      variant="primary"
                      type="submit"
                      disabled={submitDisabled}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GetEmail;
