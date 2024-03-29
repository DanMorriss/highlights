import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/SignUpForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Generates a sign-up form with username, password1, and password2 fields. Handles form submission and error display.
 *
 * @param {object} e - The event object for form submission
 */
const SignUpForm = () => {
  useRedirect('loggedIn');
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  /**
   * Handles the change event and updates the sign up data state.
   *
   * @param {Event} e - the event object
   */
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handles the form submission asynchronously,
   * then sends the user to the sign in page.
   * 
   * @param {type} e - the event object
   */
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
          <h1 className={`${appStyles.Handwritten} text-center pb-4`}>Sign up</h1>
          <Form onSubmit={handleSubmit} className="d-flex flex-column">

            {/* Username */}
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

            {/* Password */}
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

            {/* Confirm password */}
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

            {/* Sign up button */}
            <Button
              variant="primary"
              type="submit"
              className={btnStyles.Button}
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        {/* Sign up link */}
        <Container className="text-center pt-3">
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </Container>
      </Col>

      {/* Image displayed on medium and large screens */}
      <Col md={6} className={`${styles.ImageCol} d-none d-md-block my-auto`}>
        <Image
          className={styles.Image}
          src={
            "https://res.cloudinary.com/deahxwfve/image/upload/v1708518587/What_was_the_best_part_of_your_day_square_1_p6pmnz.png"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
