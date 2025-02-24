import { useState, useEffect } from "react";

function Scenerio23() {
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Auto-saving:", text);
    }, 2000);

    return () => clearTimeout(timer);
  }, [text]);

  return <input type="text" onChange={(e) => setText(e.target.value)} />;
}

export default Scenerio23;
