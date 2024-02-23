import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/HighlightCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function HighlightCreateForm() {
  const [errors, setErrors] = useState({});

  const [highlightData, setHighlightData] = useState({
    title: "",
    description: "",
    category: "",
    tagged_user: "",
    image: "",
  });
  const { title, description, category, tagged_user, image } = highlightData;

  const handleChange = (e) => {
    setHighlightData({
      ...highlightData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setHighlightData({
        ...highlightData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          className={styles.Input}
          type="text"
          name="title"
          placeholder="Something like... Dinner with family"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

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

      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          className={styles.Input}
          name="category"
          as="select"
          defaultValue="Pick a category"
          value={category}
          onChange={handleChange}
        >
          <option>Pick a category</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="tagged_user">
        <Form.Label>Tag someone</Form.Label>
        <Form.Control
          className={styles.Input}
          name="tagged_user"
          type="text"
          placeholder="Search for a user..."
          value={tagged_user}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.FormButtons}`}
        type="submit"
      >
        Post
      </Button>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.FormButtons}`}
        onClick={() => {}}
      >
        Cancel
      </Button>
    </div>
  );

  const imageField = (
    <Form.Group className="text-center">
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
        </>
      ) : (
        <Form.Label
          className="d-flex justify-content-center"
          htmlFor="image-upload"
        >
          <Asset src={Upload} message="Add an image" />
        </Form.Label>
      )}

      <Form.File
        id="image-upload"
        accept="image/*"
        onChange={handleChangeImage}
        className="text-center shadow-lg"
      />
    </Form.Group>
  );

  const locationGrabber = (
    <div className={`${btnStyles.Button} ${btnStyles.Blue} btn`}>
      Add Current Location
    </div>
  );

  return (
    <>
      <h1 className={`${appStyles.Handwritten} text-center pt-3 pb-3`}>
        Create a Highlight
      </h1>
      <Form>
        <Row>
          <Col md={6} sm={12} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>

          <Col className="" md={6} sm={12}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <div className="">{imageField}</div>
              {locationGrabber}

              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default HighlightCreateForm;
