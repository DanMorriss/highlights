import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Media from "react-bootstrap/Media";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

/**
 * Generates a comment component for displaying and interacting with comments.
 *
 * @param {Object} props - Object containing profile_id, profile_image, owner, updated_on, content, id, setHighlight, setComments, history
 * @return {JSX.Element} Comment component UI
 */
const Comment = ({
  profile_id,
  profile_image,
  owner,
  updated_on,
  content,
  id,
  setHighlight,
  setComments,
  history,
}) => {
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);

  /**
   * A function that handles the deletion of a comment,
   * then redirects the user back to the previous page.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setHighlight((prevHighlight) => ({
        results: [
          {
            ...prevHighlight.results[0],
            comments_count: prevHighlight.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>
          {/* Show edit form if the current user is the owner */}
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {/* Show edit/delete options if the current user is the owner */}
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
