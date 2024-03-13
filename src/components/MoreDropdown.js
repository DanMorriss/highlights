import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa fa-ellipsis-v"
    aria-hidden="true"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

/**
 * Component for rendering a dropdown with more options.
 *
 * @param {function} handleEdit - Function to handle the edit action
 * @param {function} handleDelete - Function to handle the delete action
 * @return {JSX.Element} Dropdown component with more options
 */
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className={`${styles.Dropdown} text-center`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="Edit highlight"
        >
          <i className="fas fa-feather-pointed" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="Delete highlight"
        >
          <i className="fas fa-trash" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

/**
 * Renders a dropdown menu for editing profile options.
 *
 * @param {object} id - The unique identifier of the profile
 * @return {JSX.Element} The dropdown menu component
 */
export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className={styles.Dropdown}>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
          className={styles.DropdownItemWithText}
        >
          <i className={`${styles.Icon} fas fa-feather-pointed`} /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
          className={styles.DropdownItemWithText}
        >
          <i className={`${styles.Icon} far fa-id-card`} />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
          className={styles.DropdownItemWithText}
        >
          <i className={`${styles.Icon} fas fa-key`} />
          change password
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/location`)}
          aria-label="add-location"
          className={styles.DropdownItemWithText}
        >
          <i className={`${styles.Icon} fas fa-location-dot`} /> Add Location
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
