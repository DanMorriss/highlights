import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Contact.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

/**
 * Contact component for the contact form.
 *
 * @return {JSX.Element} The contact form component
 */
const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    content: "",
  });
  const { fname, lname, email, content } = contactFormData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  /**
   * A function that handles the change event.
   *
   * @param {Event} e - the event object
   */
  const handleChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * A function to handle form submission asynchronously,
   * then sends the user to the thank you page.
   *
   * @param {Event} event - the event object
   * @return {Promise<void>} a promise that resolves when the function completes
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/feedback/", contactFormData);
      history.push("/contact-us/thanks");
    } catch (err) {
      // console.log(err);
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
            {/* First Name */}
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

            {/* Last Name */}
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

            {/* Email */}
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

            {/* Message */}
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

            {/* Submit Button */}
            <button type="submit" className={`${btnStyles.Button} ${styles.Clickable}`}>Submit</button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default Contact;
