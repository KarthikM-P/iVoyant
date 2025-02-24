import { useState, useEffect } from "react";

function Scenerio13() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500); 

    
    return () => clearTimeout(handler);
  }, [inputValue]); 

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
      />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
}

export default Scenerio13;
