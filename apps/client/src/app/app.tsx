// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {createBrowserRouter, Route, RouterProvider,} from 'react-router-dom';
import {UserDetail} from "./components/User";
import {UserSubjects} from "./components/Subjects";
import {Login} from "./components/Login";
import {Logout} from "./components/Logout";
import {Users} from "./components/Users";
import {Home} from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

const App: React.FC = () => (
  <RouterProvider router={router}/>
/*
  <Switch>
    <Route exact path="/" component={Users} />
    <Route exact path="/users/:userId" component={UserDetail} />
    <Route exact path="/users/:userId/subjects" component={UserSubjects} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
  </Switch>
*/
);

export default App;
