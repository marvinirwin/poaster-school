import {useContext, useEffect} from "react";
import {UserContext} from "./LoggedInUserContext";

export const useNavigateToLoginIfNotAuthenticated = () => {
  const {authenticated, user} = useContext(UserContext);
  useEffect(() => {
    if (authenticated === false && location.pathname !== '/login') {
      const search = new URLSearchParams(location.search);
      search.set('redirect_uri', `${window.location.pathname}?${window.location.search}`)
      window.location.href = `${window.location.origin}/login?${search.toString()}`;
    }
  }, [authenticated])
};
