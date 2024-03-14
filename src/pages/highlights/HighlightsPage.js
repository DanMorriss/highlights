import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/HighlightsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Highlight from "./Highlight";

import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../../pages/profiles/PopularProfiles";

/**
 * Fetches highlights based on the provided filter and query.
 *
 * @param {Object} props - Object containing message and optional filter
 * @return {JSX.Element} The highlights page component
 */
function HighlightsPage({ message, filter = "" }) {
  const [highlight, setHighlight] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    /**
     * Fetches highlights using axiosReq.
     * If successful, sets the highlights state and sets the hasLoaded state to true.
     * If unsuccessful, logs the error.
     */
    const fetchHighlights = async () => {
      try {
        const { data } = await axiosReq.get(
          `/highlights/?${filter}search=${query}`
        );
        setHighlight(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchHighlights();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Popular profiles on small screens displayed here */}
        <PopularProfiles mobile />
        {/* Search bar */}
        <i className={`fas fa-search ${styles.SearchIcon}`}></i>
        <Form className={styles.SearchBar} onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mr-sm-2"
          />
        </Form>

        {/* Highlights list displayed once loaded inside infinite scroll */}
        {hasLoaded ? (
          <>
            {highlight.results.length ? (
              <InfiniteScroll
                children={highlight.results.map((highlight) => (
                  <Highlight
                    key={highlight.id}
                    {...highlight}
                    setHighlight={setHighlight}
                  />
                ))}
                dataLength={highlight.results.length}
                loader={<Asset spinner />}
                hasMore={!!highlight.next}
                next={() => fetchMoreData(highlight, setHighlight)}
              />
            // No results message if no results
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        // Spinner if not loaded yet
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      {/* Popular profiles on large screens displayed here */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default HighlightsPage;
