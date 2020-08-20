import { useEffect, useRef, useState } from 'react';

export default function useDebouncedValue(value = null, millis = 300) {
  const timer = useRef();
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    timer.current && clearTimeout(timer.current);

    timer.current = setTimeout(() => setDebouncedValue(value), millis);
  }, [setDebouncedValue, value]);

  return debouncedValue;
}
