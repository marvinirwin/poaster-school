import React from "react";
import {useNavigate} from "react-router-dom";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // TODO perform logout logic here
    // navigate({pathname: '/login'});
  };
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
