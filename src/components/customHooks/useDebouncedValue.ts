import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

/**
 * Returns a debounced version of a value
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number = 500
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debouncedSetter = useMemo(
    () => debounce(setDebouncedValue, delay),
    [delay]
  );

  useEffect(() => {
    debouncedSetter(value);
    return () => debouncedSetter.cancel();
  }, [value, debouncedSetter]);

  return debouncedValue;
}
