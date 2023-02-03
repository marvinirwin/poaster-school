import {useNavigateToLoginIfNotAuthenticated} from "../lib/useNavigateToLoginIfNotAuthenticated";
import { UserList } from "./UserList";

export const Home = () => {
  useNavigateToLoginIfNotAuthenticated();
  return <UserList/>
}
