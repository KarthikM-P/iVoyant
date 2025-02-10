import { useState } from "react";

const UserName = () => {
    const [name, setName] = useState<string>("");
  
    return (
      <div>
        <h1>display your name</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder="Enter your name"/>
        <p>Your name is: {name}</p>
      </div>
    );
  };
  
export default UserName