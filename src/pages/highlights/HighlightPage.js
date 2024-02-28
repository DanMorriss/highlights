import React, { useEffect, useState } from "react";

import appStyles from "../../App.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

const HighlightPage = () => {
  const { id } = useParams();
  const [highlight, setHighlight] = useState({results: []});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{data: highlight}] = await Promise.all([
          axiosReq.get(`/highlights/${id}`),
        ])
        setHighlight({results: [highlight]})
        console.log(highlight)
      } catch(err) {
        console.log(err)
      }
    }

    handleMount();
  }, [id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for Mobile</p>
        <p>Post component</p>
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col className="d-none d-lg-block p-0 p-lg-2" lg={4}>
        <p>Popular profiles for Desktop</p>
      </Col>
    </Row>
  );
};

export default HighlightPage;
