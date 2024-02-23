import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "../../styles/About.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom";

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
          {currentUser ? (
            <Link to="/contact-us"><Button className={btnStyles.Button} variant="primary">
              Send us a Message
            </Button></Link>
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
