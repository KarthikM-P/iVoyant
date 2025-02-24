import { useState } from "react";
import { useDebounce } from "use-debounce";


function Scenerio18() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value)}
      value={debouncedQuery}
    />
  );
}

export default Scenerio18;
