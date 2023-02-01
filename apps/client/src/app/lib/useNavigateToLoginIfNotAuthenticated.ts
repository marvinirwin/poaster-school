import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const useNavigateToLoginIfNotAuthenticated = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = true;
  useEffect(() => {
    if (!isLoggedIn) {
      navigate({pathname: '/login', search: location.search})
    }
  }, [])
};
