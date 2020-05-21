import { useEffect, useRef, useState } from 'react';

export default function useMinWait({
  isWaiting,
  autoComplete = false,
  startWaiting = false,
  minimum,
}) {
  const [isMinWaiting, setIsMinWaiting] = useState(autoComplete || startWaiting);
  const [isComplete, setIsComplete] = useState(false);
  const timer = useRef();

  useEffect(() => {
    if (isWaiting || autoComplete) {
      timer.current && clearTimeout(timer.current);

      setIsMinWaiting(true);
      setIsComplete(false);

      timer.current = setTimeout(() => setIsComplete(true), minimum || 0);
    }
  }, [isWaiting, setIsComplete, setIsMinWaiting]);

  useEffect(() => {
    !isWaiting && isComplete && setIsMinWaiting(false);
  }, [isWaiting, isComplete, setIsMinWaiting]);

  return isMinWaiting;
}
