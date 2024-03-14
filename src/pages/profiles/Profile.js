import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

/**
 * Renders a profile component with user profile information and follow/un-follow functionality.
 *
 * @param {object} props - The properties object containing profile information and settings.
 * @return {JSX.Element} The rendered profile component.
 */
const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      {/* Link to a users profile with their avatar. */}
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>

      {/* Username */}
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>

      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {/* Display follow/un-follow button for desktop users who are logged in and not the owner */}
        {!mobile &&
          currentUser &&
          !is_owner &&
          // If the user is following the profile, display the Un-follow button for desktop users
          (!mobile && following_id ? (
            <Button
              className={btnStyles.UnFollowBtn}
              onClick={() => handleUnfollow(profile)}
              aria-label="Unfollow user"
            >
              <i className={`fa-solid fa-user-minus ${btnStyles.Icon}`}></i>
            </Button>
          // If the user is not following the profile, display the Follow button for desktop users
          ) : (
            <Button
              className={btnStyles.FollowBtn}
              onClick={() => handleFollow(profile)}
              aria-label="Follow user"
            >
              <i className={`fa-solid fa-user-plus ${btnStyles.Icon}`}></i>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
