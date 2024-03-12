import React, { useState } from "react";
import btnStyles from "../styles/Buttons.module.css";

const Location = () => {
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    name: "",
  });

  const getLocation = () => {
    const currentLocation = navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
        fetch(locationApi)
          .then((response) => response.json())
          .then((data) => {
            setLocationData({
              latitude: lat,
              longitude: long,
              name: data.city + ", " + data.countryCode,
            });
            console.log(locationData);
          });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <div
        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
        onClick={getLocation}
      >
        Add Current Location
      </div>
      <div>
        <p>{locationData.name}</p>
      </div>
    </>
  );
};

export default Location;
