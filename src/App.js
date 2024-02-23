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

function App() {
  const currentUser = useCurrentUser();
  console.log(currentUser);

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <About />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/highlights/create" render={() => <HighlightCreateForm />} />
          <Route exact path="/discover" render={() => <h1>Discover Page</h1>} />
          <Route render={() => <h1>Page not found</h1>} />

        </Switch>
      </Container>
    </div>
  );
}

export default App;
