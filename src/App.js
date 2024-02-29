import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import About from "./pages/about/About";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import HighlightCreateForm from "./pages/highlights/HighlightCreateForm";
import HighlightPage from "./pages/highlights/HighlightPage";
import HighlightsPage from "./pages/highlights/HighlightsPage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <About />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/highlights/create"
            render={() => <HighlightCreateForm />}
          />
          <Route
            exact
            path="/highlights/:id"
            render={() => <HighlightPage />}
          />
          <Route
            exact
            path="/discover"
            render={() => (
              <HighlightsPage message="No results found, try changing your search" />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <HighlightsPage
                message="No results found, try changing your search or follow a user"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <HighlightsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`like__owner__profile=${profile_id}&ordering=-likes__created_on&`}
              />
            )}
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
