import {useNavigateToLoginIfNotAuthenticated} from "../lib/useNavigateToLoginIfNotAuthenticated";

export const Home = () => {
  useNavigateToLoginIfNotAuthenticated();
  return <div>Home</div>;
}
