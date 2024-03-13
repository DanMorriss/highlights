import React from "react";
import styles from "../styles/Avatar.module.css";

/*
A component for displaying an avatar image and text,
the default height is 45px
*/
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
