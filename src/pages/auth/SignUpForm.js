import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Image } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className="mt-3">
      <Col className="my-auto" md={6}>
        <Container>
          <h1 className="text-center pb-4">Sign up</h1>
          <Form onSubmit={handleSubmit} className="d-flex flex-column">
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button variant="primary" type="submit" className={styles.Button}>
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className="text-center pt-3">
          <p>
            Already have an account? <Link to="/signin">Sign in
            </Link>
          </p>
        </Container>
      </Col>
      <Col md={6} className={`${styles.ImageCol} d-none d-md-block my-auto`}>
        <Image className={styles.Image} src={"https://res.cloudinary.com/deahxwfve/image/upload/v1708518587/What_was_the_best_part_of_your_day_square_1_p6pmnz.png"} />
      </Col>
    </Row>
  );
};

export default SignUpForm;
