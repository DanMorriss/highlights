import React from "react";
import appStyles from "../../App.module.css";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

/**
 * Renders a list of popular profiles based on the useProfileData hook.
 *
 * @param {Object} mobile - a boolean indicating if the component is being rendered on a mobile device
 * @return {JSX.Element} the container component with the list of popular profiles
 */
const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      <p>Who to follow?</p>
      {/* If there are popular profiles, do the following */}
      {popularProfiles.results.length ? (
        <>
          {/* Render a list of 4 popular profiles for mobile */}
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          // Render the list of popular profiles for desktop
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        // If there are no popular profiles, render a spinner
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
