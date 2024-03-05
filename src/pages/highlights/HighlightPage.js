import React, { useEffect, useState } from "react";

import appStyles from "../../App.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Highlight from "./Highlight";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const HighlightPage = () => {
  const { id } = useParams();
  const [highlight, setHighlight] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: highlight }] = await Promise.all([
          axiosReq.get(`/highlights/${id}`),
        ]);
        setHighlight({ results: [highlight] });
        console.log(highlight);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for Mobile</p>
        <Highlight
          {...highlight.results[0]}
          setHighlight={setHighlight}
          highlightPage
        />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setHighlight={setHighlight}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
        </Container>
      </Col>
      <Col className="d-none d-lg-block p-0 p-lg-2" lg={4}>
        <p>Popular profiles for Desktop</p>
      </Col>
    </Row>
  );
};

export default HighlightPage;
