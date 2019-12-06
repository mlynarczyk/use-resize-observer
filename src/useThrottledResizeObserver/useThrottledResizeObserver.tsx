import { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '../useResizeObserver/useResizeObserver';

// TODO: this needs a polyfill for node
// TODO: consider returning a callback to give users option to cancel queued function call
export function useRafDebouncedValue<T>(value: T) {
  const [debouncedState, setDebouncedState] = useState(value);
  const queued = useRef<number>();

  useEffect(() => {
    queued.current = requestAnimationFrame(() => setDebouncedState(value));
    return () => {
      queued.current && cancelAnimationFrame(queued.current);
    };
  }, [value]);

  useEffect(() => {
    return () => {
      queued.current && cancelAnimationFrame(queued.current);
    };
  }, []);

  return debouncedState;
}

export const useThrottledResizeObserver = () => {
  const values = useResizeObserver();
  const debouncedValues = useRafDebouncedValue(values);

  return [debouncedValues];
};
