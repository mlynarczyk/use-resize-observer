import ResizeObserver from 'resize-observer-polyfill';

// According to https://github.com/WICG/ResizeObserver/issues/59
//  using one ResizeObserver is multiple times more performant than
//  defining one per observed element. Keeping all of the elements
//  we observe along with their respective callbacks, allows us
//  to leverage having only one ResizeObserver instance.
const observedElements: Map<
  Element,
  {
    target: Element;
    callback: ({ width, height }: { width: number; height: number }) => void;
  }
> = new Map();

function handleResize(entries: ResizeObserverEntry[]) {
  entries.forEach(({ contentRect, target }) => {
    const observedWidth = Math.round(contentRect.width);
    const observedHeight = Math.round(contentRect.height);

    const observedElementOptions = observedElements.get(target);

    observedElementOptions &&
      observedElementOptions.callback({
        width: observedWidth,
        height: observedHeight,
      });
  });
}

const observer: ResizeObserver = new ResizeObserver(handleResize);

export const observe = (
  callback: ({ height, width }: { height: number; width: number }) => void,
  element: Element,
) => {
  if (!element || !callback) return;

  // According to spec: https://drafts.csswg.org/resize-observer/#dom-resizeobserver-observe
  //  if called with same element twice, second call would unobserve instead,
  //  and we don't want that to happen
  if (observedElements.has(element)) return;

  observedElements.set(element, {
    target: element,
    callback,
  });

  // At the time of writing this, ResizeObserver does accept second argument
  //  so its not possible to define box model, it uses 'content-box' by default,
  //  more info about that can be found here: https://drafts.csswg.org/resize-observer/#resize-observer-interface
  observer.observe(element);
};

export const unobserve = (element: Element) => {
  observedElements.delete(element);
  observer.unobserve(element);
};
