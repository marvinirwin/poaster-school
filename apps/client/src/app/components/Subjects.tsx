import React from "react";

export const UserSubjects: React.FC<{ userId: string }> = ({userId}) => (
  <h1>User Subjects for {userId}</h1>
);
