import { useRef } from "react";

function Scenerio14() {
  const startTime = useRef(null);

  const start = () => {
    startTime.current = Date.now();
    console.log("Start Time:", startTime.current);
  };

  return <button onClick={start}>Start StopWatch</button>;
}

export default Scenerio14;
