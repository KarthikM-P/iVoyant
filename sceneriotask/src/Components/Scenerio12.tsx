import { useState, useEffect } from "react";

function Scenerio12({ storageKey, initialValue }) {
  // ✅ Initialize state with value from localStorage OR fallback to initialValue
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // ✅ Sync value with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return (
    <div>
      <h2>Stored Value: {value}</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter new value"
      />
    </div>
  );
}

export default Scenerio12;
