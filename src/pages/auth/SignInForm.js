import React, { useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import styles from "../../styles/SignInForm.module.css";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  return (
    <Row className="mt-3">
      <Col className="my-auto" md={6}>
        <Container>
          <h1 className="text-center pb-4">Sign in</h1>
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

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              className="{styles.Button}"
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Sign in
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
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </Container>
      </Col>
      <Col className={`${styles.ImageCol} d-none d-md-block my-auto`} md={6}>
        <Image
          className={styles.Image}
          src={
            "https://res.cloudinary.com/deahxwfve/image/upload/v1708524873/What_was_the_best_part_of_your_day_square_4_o8jecl.png"
          }
        />
      </Col>
    </Row>
  );
};

export default SignInForm;