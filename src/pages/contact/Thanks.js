import React from "react";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Thanks component function that displays a message and a link after a user has filled out a contact form.
 *
 * @return {JSX.Element} The Thanks component UI
 */
const Thanks = () => {
  useRedirect("LoggedOut");
  return (
    <Container className="text-center pt-3">
      <h1 className={appStyles.Handwritten}>Thanks for getting in touch</h1>
      <p className="pt-3">
        We appreciate feedback, it helps us make the site better!
      </p>
      <p>
        Why not have a look at your <Link to="/feed">feed</Link> and see what
        other people have been posting.
      </p>
    </Container>
  );
};

export default Thanks;
