import {useNavigateToLoginIfNotAuthenticated} from "../lib/useNavigateToLoginIfNotAuthenticated";
import { Users } from "./Users";

export const Home = () => {
  useNavigateToLoginIfNotAuthenticated();
  return <Users/>
}
