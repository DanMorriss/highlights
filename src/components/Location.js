import React, { useEffect, useState } from "react";
import btnStyles from "../styles/Buttons.module.css";
import { axiosReq } from "../api/axiosDefaults";
import Asset from "./Asset";
import { Form } from "react-bootstrap";

const Location = () => {
  const [errors, setErrors] = useState({});
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    name: "",
  });
  const [locationLoading, setLocationLoading] = useState(false);

  /**
   * This function retrieves the current location using the browser's geolocation API,
   * fetches the reverse geocode information from a third-party API,
   * and updates the location data in the component state.
   * If an error occurs, logs the error.
   */
  const getLocation = async () => {
    setLocationLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      const response = await fetch(locationApi);
      const data = await response.json();

      setLocationData({
        latitude,
        longitude,
        name: data.city + ", " + data.countryCode,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLocationLoading(false);
    }
  };

  {/* Add location to database */}
  useEffect(() => {
    if (locationData) {
      console.log(locationData);
      handleSubmit(locationData);
    }
  }, [locationLoading]);

  /**
   * Handle form submission asynchronously.
   * 
   * @return {Promise} a Promise that resolves when the submission is handled
   */
  const handleSubmit = async (e) => {
    try {
      const { data } = await axiosReq.post("/locations/", locationData);
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
        <i class="fa-solid fa-location-dot"></i>
      </div>
      <Form>
        <Form.Group>
          <Form.Label>Add Location</Form.Label>
          <Form.Control
            type="text"
            value={locationData.name}

            onChange={(e) => setLocationData({ ...locationData, name: e.target.value })}
          />
        </Form.Group>
      </Form>
      <div>
        {locationLoading && <Asset spinner />}
      </div>
    </>
  );
};

export default Location;
