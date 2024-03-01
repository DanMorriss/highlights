import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";

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

export const MoreDropdown = ({handleEdit, handleDelete}) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className={`${styles.Dropdown} text-center`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="Edit highlight"
        ><i className="fas fa-feather-pointed" /></Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="Delete highlight"
        ><i className="fas fa-trash" /></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
