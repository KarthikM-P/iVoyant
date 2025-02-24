import { useState, useMemo } from "react";

function Scenerio8({ users }) {
  const filteredUsers = useMemo(() => users.filter(user => user.age > 18), [users]);

  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default Scenerio8;
