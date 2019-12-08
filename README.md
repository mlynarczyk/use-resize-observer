# useResizeObserver react hook

A react hook that serves as a convenient wrapper for ResizeObserver - a method for observing and reacting to changes to sizes of DOM elements.

# Installation

Yarn:

```
yarn add @mlynarczyk/use-resize-observer
```

Npm:

```
npm i @mlynarczyk/use-resize-observer --save
```

Usage:

```tsx
import { useResizeObserver } from '@mlynarczyk/useResizeObserver';

const ExampleComponent: React.FC = () => {
  const [{ setReference, dimensionsDetected, height }] = useResizeObserver();

  return (
    <div
      style={{
        height: dimensionsDetected ? height : '100px',
      }}
    >
      <div ref={setReference}>{children}</div>
    </div>
  );
};
```
