import React from "react";
import styles from "../../styles/Highlight.module.css";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

/**
 * Renders a highlight component with user interaction features.
 *
 * @param {Object} props - object containing properties for the highlight
 * @return {JSX.Element} the rendered highlight component
 */
const Highlight = (props) => {
  const {
    id,
    title,
    description,
    improve,
    image,
    category,
    location,
    tagged_user,
    created_on,
    owner,
    profile_image,
    profile_id,
    comments_count,
    likes_count,
    like_id,
    highlightPage,
    setHighlight,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /**
   * Handles the click event for the edit button,
   * and navigates to the edit page.
   */
  const handleEdit = () => {
    history.push(`/highlights/${id}/edit`);
  };

  /**
   * Handles the click event for the delete button,
   * deletes the highlight and send the user back to the previous page.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/highlights/${id}/`);
      history.push('/feed/');
    } catch (err) {
      console.log(err);
    }
  };

  const date = new Date(created_on);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  /**
   * A function that handles the like functionality by sending a POST request to add a like to a specific highlight,
   * updating the state with the new like information.
   */
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { highlight: id });
      setHighlight((prevHighlights) => ({
        ...prevHighlights,
        results: prevHighlights.results.map((highlight) => {
          return highlight.id === id
            ? {
                ...highlight,
                likes_count: highlight.likes_count + 1,
                like_id: data.id,
              }
            : highlight;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * A function that handles the unlike action by deleting a like and updating state.
   */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setHighlight((prevHighlights) => ({
        ...prevHighlights,
        results: prevHighlights.results.map((highlight) => {
          return highlight.id === id
            ? {
                ...highlight,
                likes_count: highlight.likes_count - 1,
                like_id: null,
              }
            : highlight;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${styles.Highlight}`}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {/* Image link to users profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>

          {/* Date link to the highlight page. Does not display on the highlight page */}
          {!highlightPage ? (
            <div className="d-flex align-items-center">
              <Link
                className="align-items-center justify-content-between"
                to={`/highlights/${id}`}
              >
                <div className="d-flex align-items-center">
                  <span className={`${styles.DiaryFontLinkStandardDisplay} `}>
                    {formattedDate}
                  </span>
                </div>
              </Link>
              {/* Dropdown menu for editing and deleting highlights if the user is the owner */}
              {is_owner && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          ) : (
            // Displays the date on the highlight page
            <div className="d-flex align-items-center">
              <span className={`${styles.DiaryFont}`}>{formattedDate}</span>
              {/* Dropdown menu for editing and deleting highlights if the user is the owner */}
              {is_owner && highlightPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          )}
        </Media>
      </Card.Body>

      {/* If there is an image, display it as a link to the highlight page */}
      {image && (
        <Link to={`/highlights/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
      )}

      <Card.Body>
        {/* Displays the location on the highlight page */}
        {location && highlightPage && (
          <span className={`${styles.DiaryFont} text-muted`}>{location}</span>
        )}
        <div className="d-flex justify-content-between align-items-baseline mb-3">
          {/* Displays the category on the highlight page */}
          {category && highlightPage && (
            <span className={styles.Category}>#{category}</span>
          )}
          {/* Displays the tagged user on the highlight page if there is one */}
          {tagged_user && highlightPage && (
            <Avatar src={tagged_user.profile_image} height={30} />
          )}
        </div>

        {/* Displays the title question on the highlight page */}
        {highlightPage && (
          <Card.Title className={`${styles.DiaryQuestions} mb-3`}>
            What was the highlight of your day?
          </Card.Title>
        )}

        <p className={`${styles.DiaryFont} text-center `}>{title}</p>

        {/* Displays the description on the highlight page if there is one */}
        {description && highlightPage && (
          <Card.Text className="text-center">{description}</Card.Text>
        )}

        {/* Displays the improve on the highlight page if there is one */}
        {improve && highlightPage && (
          <>
            <Card.Title className={`${styles.DiaryQuestions} mb-3`}>
              What would have made today even better?
            </Card.Title>
            <Card.Text className="text-center">{improve}</Card.Text>
          </>
        )}

        <div className={` d-flex justify-content-center align-items-center`}>
          {/* If the user is the owner, let them know they can't like their own highlight */}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own highlight</Tooltip>}
            >
              <i className="far fa-heart"></i>
            </OverlayTrigger>
          ) : // If the user has liked the highlight, display the filled in heart
          like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : // If the user has not liked the highlight and is logged in, display the outline
          currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            // If the user is not logged in, display the outline and tell them to log in to like a highlight
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like a highlight</Tooltip>}
            >
              <i className="far fa-heart"></i>
            </OverlayTrigger>
          )}
          {likes_count}
          <Link className={styles.Comment} to={`/highlights/${id}`}>
            <i className="far fa-comment" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Highlight;
