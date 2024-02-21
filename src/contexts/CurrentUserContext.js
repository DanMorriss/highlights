import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const CurrentUserContext = createContext();
export const setCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(setCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    // Request interceptors to refresh tokens
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("dj-rest-auth/token/refresh/");
        } catch (err) {
          // If it fails the user is set to null and redirected to the sign in page
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Response interceptors to refresh tokens
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        // If 401 is returned, try to refresh the token
        if (err.response?.status === 401) {
          try {
            await axios.post("dj-rest-auth/token/refresh/");
          } catch (err) {
            // If it fails the user is set to null and redirected to the sign in page
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axiosRes(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <setCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </setCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
