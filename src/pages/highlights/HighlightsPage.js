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

function HighlightsPage({ message, filter = "" }) {
  const [highlights, setHighlights] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const { data } = await axiosReq.get(
          `/highlights/?${filter}search=${query}`
        );
        setHighlights(data);
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
        <PopularProfiles mobile />
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

        {hasLoaded ? (
          <>
            {highlights.results.length ? (
              <InfiniteScroll
                children={highlights.results.map((highlight) => (
                  <Highlight
                    key={highlight.id}
                    {...highlight}
                    setHighlights={setHighlights}
                  />
                ))}
                dataLength={highlights.results.length}
                loader={<Asset spinner />}
                hasMore={!!highlights.next}
                next={() => fetchMoreData(highlights, setHighlights)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default HighlightsPage;
