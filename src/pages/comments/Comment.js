import React from "react";
import styles from "../../styles/Comment.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";

const Comment = ({ profile_id, profile_image, owner, updated_at, content }) => {
  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;