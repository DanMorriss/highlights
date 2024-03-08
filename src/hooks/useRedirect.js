import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        // if the user is logged in, the following code will run
        if (userAuthStatus === 'loggedIn') {
          history.push('/feed');
        }
      } catch (err) {
        // if the user is not logged in, the following code will run
        if (userAuthStatus === 'loggedOut') {
          history.push('/discover');
        }
      }
    }

    handleMount();
  }, [history, userAuthStatus]);
};
