import { useCallback, useState} from "react";
import debounce from "lodash.debounce";

import { useGetListQuery, useLazySearchListQuery } from "../api/genericApi";

export default function ExampleDebounce() {
  const [value, setValue] = useState("");

  // 1. Load ALL users initially
  const { data: allUsers , isLoading} = useGetListQuery({ resource: "users" });

  // 2. Lazy search
  const [triggerSearch, { data: searchedUsers, isFetching }] =
    useLazySearchListQuery();

const debouncedSearch = useCallback(
  debounce((query: string) => {
    if (query.trim().length > 0) {
      triggerSearch({
        resource: "users",
        keyword: query,
      });
    }
  }, 500),
  []
);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);
    debouncedSearch(text);
  };

  // Choose what to display
  const usersToShow =
    value.trim().length > 0 ? searchedUsers : allUsers;

  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 rounded w-full"
        value={value}
        onChange={handleChange}
        placeholder="Search users..."
      />

      {(isLoading || isFetching) && <p>Loading...</p>}

      <ul className="mt-4">
        {usersToShow?.map((user: any) => (
          <li key={user.id} className="mb-2 border-b pb-2">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
