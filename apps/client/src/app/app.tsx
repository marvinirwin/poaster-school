// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useContext, useEffect, useMemo} from 'react';
import {createBrowserRouter, Route, RouterProvider, useParams,} from 'react-router-dom';
import {UserInfo} from "./components/User";
import {Login} from "./components/Login";
import {UserList} from "./components/UserList";
import {Home} from "./components/Home";
import {ToastList} from "./components/ToastList";
import {ErrorProvider, useError} from "./lib/ErrorContext";
import {useUser} from "./lib/services/useFetchedData";
import {LoadingSpinner} from "./components/LoadingSpinner";
import {UserProvider} from "./lib/LoggedInUserContext";
import {useNavigateToLoginIfNotAuthenticated} from "./lib/useNavigateToLoginIfNotAuthenticated";
import {LoadingContext, LoadingContextProvider} from "./lib/UseLoadingContext";
import { Profile } from './components/Profile';
import { Signup } from './components/Signup';


const UserInfoRoute = () => {
  const {userId} = useParams();
  const {isLoading, result: userProfile, setResult: setUserProfile} = useUser(userId || "");
  return isLoading ? <LoadingSpinner/> : (userProfile ?
    <UserInfo userProfile={userProfile} setUserProfile={setUserProfile}/> : <>'Error fetching user info'</>)
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: '/user/list',
    element: <UserList/>
  },
  {
    path: '/user/:userId',
    element: <UserInfoRoute/>
  },
  {
    path: '/profile',
    element: <Profile/>
  }
]);

const AppWrapper = () => {
  return <LoadingContextProvider>
    <ErrorProvider>
      <UserProvider>
        <App/>
      </UserProvider>
    </ErrorProvider>
  </LoadingContextProvider>
}
const App: React.FC = () => {
  const {errors} = useError();
  const {loadingMessages} = useContext(LoadingContext);
  useNavigateToLoginIfNotAuthenticated();
  return <>
    <ToastList
      errors={errors}
      loadingMessages={loadingMessages}
    />
    <RouterProvider router={router}/>
  </>
};

export default AppWrapper;
