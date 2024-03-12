import React, { useState } from "react";
import btnStyles from "../styles/Buttons.module.css";
import { axiosReq } from "../api/axiosDefaults";
import Asset from "./Asset";

const Location = () => {
  const [errors, setErrors] = useState({});
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    name: "",
  });
  const [locationLoading, setLocationLoading] = useState(false);

  const getLocation = () => {
    setLocationLoading(true);
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
            setLocationLoading(false);
          });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSubmit = async (e) => {
    try {
      const { data } = await axiosReq.post("/location/", locationData);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
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
        {locationLoading && (
          <Asset spinner />
        )}
        <p>{locationData.name}</p>
      </div>
    </>
  );
};

export default Location;
