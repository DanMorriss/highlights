import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";

/**
 * Component for editing comments.
 *
 * @param {Object} props - Object containing id, content, setShowEditForm, and setComments
 * @return {JSX.Element} A form for editing comments
 */
function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);

  /**
   * A function to handle the change event.
   *
   * @param {event} event - the event object
   */
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  /**
   * A function that handles form submission asynchronously.
   *
   * @param {Event} event - the event triggering the form submission
   * @return {Promise} a Promise that resolves after handling the form submission
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;