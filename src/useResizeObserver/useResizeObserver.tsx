import { useState, useMemo, useCallback, useRef } from 'react';
import { observe, unobserve } from './useResizeObserverHelpers';

export const useResizeObserver = () => {
  const [state, setState] = useState<{
    dimensionsDetected: boolean;
    width?: number;
    height?: number;
  }>({
    dimensionsDetected: false,
    width: undefined,
    height: undefined,
  });

  const reference = useRef<Element>();

  const callback = useCallback(
    ({ height, width }: { height: number; width: number }) => {
      setState({
        dimensionsDetected: true,
        width,
        height,
      });
    },
    [setState],
  );

  const setReference = useCallback(
    (element) => {
      if (reference.current) {
        unobserve(reference.current);
      }

      if (element) {
        observe(callback, element);
      }

      reference.current = element;
    },
    [reference, callback],
  );

  return useMemo(
    () => [
      {
        setReference,
        ...state,
      },
    ],
    [setReference, state],
  );
};
