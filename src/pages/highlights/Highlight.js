import React from "react";
import styles from "../../styles/Highlight.module.css";
import appStyles from "../../App.module.css";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Highlight = (props) => {
  const {
    id,
    title,
    description,
    image,
    category,
    location,
    tagged_user,
    created_on,
    updated_on,
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

  const date = new Date(created_on);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { highlight: id });
      setHighlight((prevHighlight) => ({
        ...prevHighlight,
        results: prevHighlight.results.map((highlight) => {
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

  const handleUnlike = async () => {
    try {
      const { data } = await axiosRes.delete(`/likes/${like_id}`);
      setHighlight((prevHighlight) => ({
        ...prevHighlight,
        results: prevHighlight.results.map((highlight) => {
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
    <Card className={styles.Highlight}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className={`${appStyles.Handwritten} ${styles.UpdatedOn}`}>
              {formattedDate}
            </span>
            {is_owner && highlightPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/highlights/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own highlight</Tooltip>}
            >
              <i className="far fa-heart"></i>
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like a highlight</Tooltip>}
            >
              <i className="far fa-heart"></i>
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/highlights/${id}`}>
            <i className="far fa-comment" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Highlight;
