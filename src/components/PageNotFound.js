import React from "react";
import NotFound from "../assets/404.png";
import Image from "react-bootstrap/Image";
import Styles from "../styles/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Image
        src={NotFound}
        alt="Page not found image"
        className={Styles.Image}
      />
      <p>Oops, looks like the page you were looking for doesn't exist!</p>
    </div>
  );
};

export default PageNotFound;
