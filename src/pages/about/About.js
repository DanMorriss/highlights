import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../../styles/About.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom";

/**
 * Returns the About component with user-specific content and conditional rendering based on the currentUser state.
 *
 * @returns {JSX.Element} The About component JSX
 */
const About = () => {
  const currentUser = useCurrentUser();
  return (
    <div className={styles.Background}>
      <Card className="text-center p-3 shadow-lg" style={{ width: "40rem" }}>
        <Card.Body>
          <h1 className={appStyles.Handwritten}>Highlights</h1>
          <Card.Text className="text-muted pt-3">
            The daily companion for sharing the highlights of your day in just a
            few minutes.
          </Card.Text>
          <h2 className={`${styles.Heading2} text-muted`}>
            What was the best part of your day?
          </h2>
          <Card.Text className="text-muted pt-2">
            Practicing gratitude to boost positivity, reduce anxiety, and
            improve well-being. It's the simplest, science-backed way to a
            happier you.
          </Card.Text>

          {/*
           * Show send us a message button if user is logged in
           * Otherwise, show sign up and sign in buttons
           */}
          {currentUser ? (
            <Link to="/contact-us">
              <Button className={btnStyles.Button} variant="primary">
                Send us a Message
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <Button className={btnStyles.Button} variant="primary">
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin">
                <Button className={btnStyles.Button} variant="primary">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;
