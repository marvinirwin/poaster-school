// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

const Users: React.FC = () => <h1>Users</h1>;

const UserDetail: React.FC<{userId: string}> = ({ userId }) => (
  <h1>User Detail for {userId}</h1>
);

const UserSubjects: React.FC<{userId: string}> = ({ userId }) => (
  <h1>User Subjects for {userId}</h1>
);

const Login: React.FC = () => {
  const history = useHistory();
  const handleLogin = () => {
    // perform login logic here
    history.push('/');
  };
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Logout: React.FC = () => {
  const history = useHistory();
  const handleLogout = () => {
    // perform logout logic here
    history.push('/login');
  };
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const App: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Users} />
    <Route exact path="/users/:userId" component={UserDetail} />
    <Route exact path="/users/:userId/subjects" component={UserSubjects} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
  </Switch>
);

export default App;
export function App() {
  return (
    <>
      <div className="bg-indigo-500 p-2 font-mono">Hello!</div>
      <div />
    </>
  );
}

export default App;
