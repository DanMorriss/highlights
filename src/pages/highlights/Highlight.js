import React from "react";
import styles from "../../styles/Highlight.module.css";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Highlight}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{created_on}</span>
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
            <span onClick={() => {}}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
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
