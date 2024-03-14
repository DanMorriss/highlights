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
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

/**
 * Render the HighlightPage component.
 */
const HighlightPage = () => {
  const { id } = useParams();
  const [highlight, setHighlight] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    /**
     * Asynchronous function to handle mounting process.
     * Gets the highlight and comments from the server.
     */
    const handleMount = async () => {
      try {
        const [{ data: highlight }, { data: comments }] = await Promise.all([
          axiosReq.get(`/highlights/${id}`),
          axiosReq.get(`/comments/?highlight=${id}`),
        ]);
        setHighlight({ results: [highlight] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Display popular profiles for small screens */}
        <PopularProfiles mobile />
        {/* Display highlight */}
        <Highlight
          {...highlight.results[0]}
          setHighlight={setHighlight}
          highlightPage
        />
        {/* Display comments */}
        <Container className={appStyles.Content}>
          {/* COMMENTS TITLE */}
          {/* Display comment create form if user is logged in */}
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              highlight={id}
              setHighlight={setHighlight}
              setComments={setComments}
            />
          // Display comments if user is not logged in and there are comments
          ) : comments.results.length ? (
            "Comments"
          // Display nothing if the user is not logged in and there are no comments
          ) : null}
          {/* COMMENTS */}
          {/* Display comments if there are comments */}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setHighlight={setHighlight}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          // If no comments and the user is logged in display a message
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          // If no comments and the user is not logged in display a message
          ) : (
            <span>Log in to be the first to comment!</span>
          )}
        </Container>
      </Col>
      <Col className="d-none d-lg-block p-0 p-lg-2" lg={4}>
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default HighlightPage;
