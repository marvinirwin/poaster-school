import React from "react";

export const UserDetail: React.FC<{ userId: string }> = ({userId}) => (
  <h1>User Detail for {userId}</h1>
);
