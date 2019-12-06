import React from 'react';
import { storiesOf } from '@storybook/react';
import { useResizeObserver } from './useResizeObserver';
import { useThrottledResizeObserver } from '../useThrottledResizeObserver/useThrottledResizeObserver';

storiesOf('useResizeObserver', module).add('Default', () => {
  const { setReference, height, width } = useResizeObserver();
  const {
    setReference: setReference2,
    height: height2,
    width: width2,
  } = useResizeObserver();

  const three = useThrottledResizeObserver();

  console.log('result:', three.width, three.height);

  return (
    <React.Fragment>
      <div
        style={{
          padding: 20,
        }}
      >
        <h2>Resize this textarea</h2>
        <div
          style={{
            position: 'relative',
          }}
        >
          <textarea
            ref={setReference}
            name="test"
            id="test"
            cols={30}
            rows={10}
          />

          <div style={{ position: 'absolute', top: 20, left: 20 }}>
            <div>Height: {height}</div>
            <div>Width: {width}</div>
          </div>
        </div>

        <h2>or your browser window</h2>

        <h3>Default</h3>
        <div
          style={{
            position: 'relative',
          }}
        >
          <div
            ref={setReference2}
            style={{
              position: 'relative',
              background: 'gray',
            }}
          >
            <div
              style={{
                paddingBottom: '10%',
              }}
            />

            <div style={{ position: 'absolute', top: 20, left: 20 }}>
              <div>Height: {height2}</div>
              <div>Width: {width2}</div>
            </div>
          </div>
        </div>

        <h3>Throttled</h3>

        <div
          style={{
            position: 'relative',
          }}
        >
          <div
            ref={three.setReference}
            style={{
              position: 'relative',
              background: 'gray',
            }}
          >
            <div
              style={{
                paddingBottom: '10%',
              }}
            />

            <div style={{ position: 'absolute', top: 20, left: 20 }}>
              <div>Height: {three.height}</div>
              <div>Width: {three.width}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});
