// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useMemo} from 'react';
import {createBrowserRouter, Route, RouterProvider, useParams,} from 'react-router-dom';
import {UserInfo} from "./components/User";
import {UserSubjects} from "./components/Subjects";
import {Login} from "./components/Login";
import {Logout} from "./components/Logout";
import {UserList} from "./components/UserList";
import {Home} from "./components/Home";
import {ToastList} from "./components/ToastList";
import {ErrorProvider, useError} from "./lib/ErrorContext";

const UserInfoRoute = () => {
  const {userId} = useParams();
  return <UserInfo userId={userId as string} />
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
    path: '/user/list',
    element: <UserList/>
  },
  {
    path: '/user/:userId',
    element: <UserInfoRoute/>
  }
]);

const AppWrapper = () => {
  return <ErrorProvider>
    <App/>
  </ErrorProvider>
}
const App: React.FC = () => {
  const {errors} = useError();
  const toastErrors = useMemo(() => errors.map(error => ({id: error + Math.random(), text: error})), [errors]);
  return <div>
    <ToastList items={toastErrors}/>
    <RouterProvider router={router}/>
  </div>
  /*
    <Switch>
      <Route exact path="/" component={Users} />
      <Route exact path="/users/:userId" component={UserDetail} />
      <Route exact path="/users/:userId/subjects" component={UserSubjects} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  */
};

export default AppWrapper;
