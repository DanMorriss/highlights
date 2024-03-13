import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

/**
 * Component for creating comments.
 *
 * @param {object} props - The properties object containing highlight, setHighlight, setComments, profileImage, and profile_id.
 * @return {JSX.Element} The comment create form component.
 */
function CommentCreateForm(props) {
  const { highlight, setHighlight, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  /**
   * A function to handle the change event.
   *
   * @param {event} event - the event object
   */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /**
   * A function that handles form submission asynchronously.
   *
   * @param {Event} event - the form submission event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        highlight,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setHighlight((prevHighlight) => ({
        results: [
          {
            ...prevHighlight.results[0],
            comments_count: prevHighlight.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;