import React, { useEffect, useState } from "react";
import btnStyles from "../styles/Buttons.module.css";
import appStyles from "../App.module.css";
import { axiosReq } from "../api/axiosDefaults";
import Asset from "./Asset";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Location = () => {
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);
  const history = useHistory();

  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    name: "",
  });

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
        ...locationData,
        latitude,
        longitude,
        name: data.city + ", " + data.countryCode,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLocationLoading(false);
      setLocationFetched(true);
    }
  };

  /* Add location to database */
  useEffect(() => {
    if (locationData) {
      handleSubmitLocation(locationData);
    }
  }, [locationFetched]);

  /**
   * Handle form location submission to the location database asynchronously.
   */
  const handleSubmitLocation = async (e) => {
    try {
      await axiosReq.post("/locations/", locationData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={appStyles.Content}>
      <h1 className={`${appStyles.Handwritten} text-center p-3`}>
        Add Your Location
      </h1>

      <Form className="d-flex flex-column align-items-center justify-content-center">
        {/* If location has not been fetched, show the button to fetch location */}
        {!locationFetched ? (
          <>
            <p className="text-center text-muted">
              You will need to allow access to your location.
            </p>
            <div
              className={`${btnStyles.LocationBtn} text-center pr-4`}
              onClick={getLocation}
            >
              <i className="fa-solid fa-location-dot"></i> Add Your Location
            </div>
          </>
        ) : (
          // If location has been fetched, show the form to edit location
          <>
            <Form.Group className="text-center">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={locationData.name}
                onChange={(e) =>
                  setLocationData({ ...locationData, name: e.target.value })
                }
              />
            </Form.Group>
            {/* Cancel  & Save Buttons */}
            <div>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
              >
                cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                save
              </Button>
            </div>
          </>
        )}

        <div>{locationLoading && <Asset spinner />}</div>
      </Form>
    </Container>
  );
};

export default Location;
