import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Highlight from "../highlights/Highlight";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

/**
 * ProfilePage component to display the user's profile and highlights.
 *
 * @return {JSX.Element} The JSX for the ProfilePage component
 */
function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileHighlights, setProfileHighlights] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    /**
     * Fetches data using axios for a specific profile and highlights,
     * and sets the retrieved information in the component state.
     * If an error occurs, logs the error.
     */
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileHighlights }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/highlights/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileHighlights(profileHighlights);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {/* Show the dropdown component to the profile owner */}
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        {/* Profile Avatar */}
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>

        {/* Profile name and stats */}
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            {/* Posts */}
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            {/* Followers */}
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            {/* Following */}
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>

        <Col lg={3} className="text-lg-right">
          {/* Follow/unfollow button */}
          {/* If the user is logged and and not the owner, display the un-follow button */}
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={btnStyles.UnFollowBtn}
                onClick={() => handleUnfollow(profile)}
                aria-label="Unfollow user"
              >
                <i className={`fa-solid fa-user-minus ${btnStyles.Icon}`}></i>
              </Button>
            // If the user is not following the profile, display the follow button
            ) : (
              <Button
                className={btnStyles.FollowBtn}
                onClick={() => handleFollow(profile)}
                aria-label="Follow user"
              >
                <i className={`fa-solid fa-user-plus ${btnStyles.Icon}`}></i>
              </Button>
            ))}
        </Col>
        {/* Profile content and bio */}
        {profile?.content && <Col className="p-3">{profile?.content}</Col>}
        {profile?.bio && <Col className="p-3">{profile?.bio}</Col>}
      </Row>
    </>
  );

  const mainProfileHighlights = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s highlights</p>
      <hr />

      {/* Check if there are any highlights and show them or else show an Asset */}
      {profileHighlights.results.length ? (
        <InfiniteScroll
          children={profileHighlights.results.map((highlight) => (
            <Highlight
              key={highlight.id}
              {...highlight}
              setProfileHighlights={setProfileHighlights}
            />
          ))}
          dataLength={profileHighlights.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileHighlights.next}
          next={() => fetchMoreData(profileHighlights, setProfileHighlights)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {/* Check if there are any profile data and show it or else show an Asset */}
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileHighlights}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
