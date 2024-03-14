import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

/**
 * Generates the navigation bar component with dynamic links based on user authentication status.
 *
 * @return {JSX.Element} The navigation bar component
 */
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const addHighlightIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/highlights/create"
    >
      <i className="fa-solid fa-feather-pointed"></i><span className={styles.Plus}>+</span> Highlight
    </NavLink>
  );

  /* Logged out links: Sign in, Sign up */
  const loggedOutLinks = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  /* Logged in links: Feed, Liked, Profile, Sign out */
  const loggedInLinks = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>

      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Signout
      </NavLink>

      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          height={40}
          className={styles.Avatar}
        />
        <span className="d-md-none d-lg-inline">{currentUser?.username}</span>
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <NavLink className={styles.NavLink} to="/">
        <Navbar.Brand className={styles.NavBarBrand}>
          <img src={logo} alt="highlights logo" height={45} />
        </Navbar.Brand>
      </NavLink>

      {/* Add highlight icon if logged in */}
      {currentUser && addHighlightIcon}

      <Navbar.Toggle
        onClick={() => setExpanded(!expanded)}
        aria-controls="basic-navbar-nav"
        ref={ref}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-left">
          <NavLink
            exact
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/discover"
          >
            <i className="fa-solid fa-magnifying-glass"></i>Discover
          </NavLink>

          {/* Add logged in links for logged in users and logged out links for logged out users */}
          {currentUser ? loggedInLinks : loggedOutLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
