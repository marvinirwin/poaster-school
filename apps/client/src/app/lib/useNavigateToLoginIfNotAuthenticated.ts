import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./LoggedInUserContext";

export const useNavigateToLoginIfNotAuthenticated = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {authenticated, user} = useContext(UserContext);
  useEffect(() => {
    if (authenticated === false) {
      const search = new URLSearchParams(location.search);
      search.set('redirect_uri', `${window.location.pathname}${window.location.search}`)
      navigate({pathname: '/login', search: location.search})
    }
  }, [authenticated])
};
