import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Upload from "../../assets/upload.png";
import styles from "../../styles/HighlightCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Component for editing and updating a highlight entry.
 *
 * @return {JSX.Element} The HighlightEditForm component
 */
function HighlightEditForm() {
  const [errors, setErrors] = useState({});

  const [highlightData, setHighlightData] = useState({
    created_on: "",
    title: "",
    description: "",
    improve: "",
    category: "",
    image: "",
  });
  const { created_on, title, description, improve, category, image } = highlightData;

  const date = new Date(created_on);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    /**
     * A function that handles the mounting process for the component.
     * Fetches the data for the highlight and sets it in the state if the user is the owner.
     * Otherwise, redirects the user to the homepage.
     */
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/highlights/${id}/`);
        const { created_on, title, description, improve, category, image, is_owner } =
          data;
        is_owner
          ? setHighlightData({
              created_on,
              title,
              description,
              improve,
              category,
              image,
            })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id, history]);

  /**
   * Handles the change event and updates the highlight data.
   *
   * @param {Event} e - the event object
   */
  const handleChange = (e) => {
    setHighlightData({
      ...highlightData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle change image event and update highlight data.
   *
   * @param {Event} e - The event object
   */
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setHighlightData({
        ...highlightData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  /**
   * Handles the form submission asynchronously.
   *
   * @param {object} e - the event object
   * @return {Promise} a promise representing the result of the form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("improve", improve);
    formData.append("category", category);
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/highlights/${id}/`, formData);
      history.push(`/highlights/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // TEXT FIELDS
  const textFields = (
    <div className="text-center">
      <Form.Group controlId="title">
        {/* Title */}
        <Form.Label>What was the highlight of your day?</Form.Label>
        <Form.Control
          className={styles.Input}
          type="text"
          name="title"
          placeholder="Something like... Dinner with family"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Description */}
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          className={styles.Input}
          name="description"
          as="textarea"
          rows={5}
          placeholder="Give some more detail on what made this highlight so great..."
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Improve */}
      <Form.Group controlId="improve">
        <Form.Label>What would have made today even better?</Form.Label>
        <Form.Control
          className={styles.Input}
          name="improve"
          as="textarea"
          rows={2}
          placeholder="Is there anything you'd like to do tomorrow?"
          value={improve}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Category */}
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          className={styles.Input}
          name="category"
          as="select"
          defaultValue="Please select a category"
          onChange={handleChange}
        >
          <option value="select">Please select a category</option>
          <option value="family-and-friends">Family and Friends</option>
          <option value="pets-and-animals">Pets and Animals</option>
          <option value="relationships">Relationships</option>
          <option value="health-and-fitness">Health and Fitness</option>
          <option value="food-and-drink">Food and Drink</option>
          <option value="self-care">Self-Care</option>
          <option value="creativity">Creativity</option>
          <option value="entertainment-and-music">
            Entertainment and Music
          </option>
          <option value="travel-and-adventure">Travel and Adventure</option>
          <option value="work-and-education">Work and Education</option>
          <option value="funny">Funny</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      {errors.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Post button */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.FormButtons}`}
        type="submit"
      >
        Update
      </Button>
      {/* Cancel button */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.FormButtons}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <>
      <h1 className={`${appStyles.Handwritten} text-center pt-3 pb-3`}>
        {formattedDate}
      </h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Text fields for medium screens and up */}
          <Col md={6} sm={12} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>

          <Col className="p-md-2" md={6} sm={12}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <div>
                {/* Image upload */}
                <Form.Group className="text-center">
                  {/* Display image if there is one and give option to upload new */}
                  {image ? (
                    <>
                      <figure>
                        <Image
                          className={`${appStyles.Image} shadow-lg`}
                          src={image}
                          rounded
                        />
                      </figure>
                      <div>
                        <Form.Label
                          className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                          htmlFor="image-upload"
                        >
                          Change the image
                        </Form.Label>
                      </div>
                      {errors.image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                          {message}
                        </Alert>
                      ))}
                    </>
                  // If there is no image, display upload button
                  ) : (
                    <Form.Label
                      className="d-flex justify-content-center"
                      htmlFor="image-upload"
                    >
                      <Asset src={Upload} message="Add an image" />
                    </Form.Label>
                  )}

                  {/* Upload button hidden with CSS, custom button above is used instead */}
                  <Form.File
                    id="image-upload"
                    accept="image/*"
                    onChange={handleChangeImage}
                    className="text-center shadow-lg"
                    ref={imageInput}
                  />
                </Form.Group>
              </div>

              {/* Display the text fields on small screens */}
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default HighlightEditForm;
