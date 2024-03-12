import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import styles from "../../styles/Contact.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

const Contact = () => {
  useRedirect("loggedOut");
  const currentUser = useCurrentUser();
  console.log(currentUser?.username);
  const [contactFormData, setContactFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    content: "",
  });
  const { fname, lname, email, content } = contactFormData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(contactFormData);

    try {
      await axiosReq.post("/feedback/", contactFormData);
      history.push("/contact-us/thanks");
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col>
        <Container className={`${appStyles.Content} text-center pt-5`}>
          <h1 className={appStyles.Handwritten}>Contact us</h1>
          <p>Let us know how we can help.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="d-none">First Name</Form.Label>
              <Form.Control
                placeholder="First name"
                type="text"
                name="fname"
                value={fname}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label className="d-none">Last Name</Form.Label>
              <Form.Control
                placeholder="First name"
                type="text"
                name="lname"
                value={lname}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label className="d-none">Email</Form.Label>
              <Form.Control
                placeholder="Email"
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label className="d-none">Message</Form.Label>
              <Form.Control
                placeholder="Your message..."
                type="textarea"
                name="content"
                value={content}
                onChange={handleChange}
                rows={4}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <button type="submit" className={`${btnStyles.Button} ${styles.Clickable}`}>Submit</button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default Contact;
