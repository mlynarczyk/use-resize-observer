import { useRafDebouncedValue } from 'use-raf-debounced-value';
import { useResizeObserver } from '../useResizeObserver/useResizeObserver';

export const useDebouncedResizeObserver = () => {
  const values = useResizeObserver();
  const [debouncedValues] = useRafDebouncedValue(values);

  return debouncedValues;
};
