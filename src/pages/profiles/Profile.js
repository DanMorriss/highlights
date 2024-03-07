import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={styles.UnFollowBtn}
              onClick={() => console.log("unfollow")}
              aria-label="Unfollow user"
            >
              <i class={`fa-solid fa-user-minus ${styles.Icon}`}></i>
            </Button>
          ) : (
            <Button
              className={styles.FollowBtn}
              onClick={() => console.log("follow")}
              aria-label="Follow user"
            >
              <i class={`fa-solid fa-user-plus ${styles.Icon}`}></i>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
