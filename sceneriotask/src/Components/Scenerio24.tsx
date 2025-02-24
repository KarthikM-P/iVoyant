import { useState, useEffect } from "react";

function Scenerio24() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("wss://example.com/socket");

    socket.onmessage = (event) => setMessage(event.data);

    return () => socket.close();
  }, []);

  return <p>Latest Message: {message}</p>;
}

export default Scenerio24;
