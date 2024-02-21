import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Image } from "react-bootstrap";
import styles from "../../styles/SignInForm.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const SignInForm = () => {
  return (
    <Row className="mt-3">
      <Col className="my-auto" md={6}>
        <Container>
          <h1 className="text-center pb-4">Sign in</h1>
          <Form className="d-flex flex-column">
            <Form.Group coltrolId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className={styles.Input}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className={styles.Input}
              />
            </Form.Group>

            <Button className="{styles.Button}" variant="primary" type="submit">
              Sign in
            </Button>
          </Form>
        </Container>
        <Container className="text-center pt-3">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </Container>
      </Col>
      <Col className={`${styles.ImageCol} d-none d-md-block my-auto`} md={6}>
      <Image className={styles.Image} src={"https://res.cloudinary.com/deahxwfve/image/upload/v1708521083/What_was_the_best_part_of_your_day_square_3_iezwoy.png"} />
      </Col>
    </Row>
  );
};

export default SignInForm;
