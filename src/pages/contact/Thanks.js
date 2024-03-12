import React from "react";
import { Button, Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

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
