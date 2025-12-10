import { useCallback, useState } from "react";
import debounce from "lodash.debounce";


export default function ExampleDebounce() {
  const [value, setValue] = useState("");

  const handleSearch = useCallback(
    debounce((query: string) => {
      console.log("API search with:", query);
      // fetch(`/api/search?q=${query}`)
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <>
    <div>hi</div>
    <input
      type="text"
      className="border p-2 rounded"
      value={value}
      onChange={handleChange}
      placeholder="Type to search..."
    />
    </>
  );
}


