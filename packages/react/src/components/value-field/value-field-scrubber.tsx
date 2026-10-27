/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 *
 * figma-kit's scrubber is in turn adapted from Base UI NumberFieldScrubArea. MIT license, Copyright
 * (c) 2019 Material-UI SAS.
 * https://github.com/mui/base-ui/blob/master/packages/react/src/number-field/scrub-area/NumberFieldScrubArea.tsx
 */
import * as React from 'react';
import { createPortal, flushSync } from 'react-dom';

import { cn, useComposedRefs } from '~/utils';

import { type ValueFieldScrubTarget, useValueFieldContext } from './value-field-elements';

const DEFAULT_PIXEL_SENSITIVITY = 2;
const DOCUMENT_POSITION_FOLLOWING = 4;

interface ScrubberProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * The number of horizontal pixels the pointer must move before the value changes.
   */
  pixelSensitivity?: number;
  /**
   * Expands the cursor wrap boundary around the scrubber by half this distance on each side.
   */
  teleportDistance?: number;
}

type PointerCoordinates = {
  x: number;
  y: number;
};

type ViewportBounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

function Scrubber(props: ScrubberProps) {
  const {
    children,
    className,
    onPointerDown,
    pixelSensitivity = DEFAULT_PIXEL_SENSITIVITY,
    teleportDistance,
    style,
    ref: forwardedRef,
    ...scrubberProps
  } = props;
  const context = useValueFieldContext('Scrubber');
  const scrubberRef = React.useRef<HTMLSpanElement | null>(null);
  const cursorRef = React.useRef<HTMLSpanElement>(null);
  const [portalRoot, setPortalRoot] = React.useState<HTMLElement | null>(null);
  const setScrubberElement = React.useCallback((element: HTMLSpanElement | null) => {
    scrubberRef.current = element;
    setPortalRoot(getPortalRoot(element));
  }, []);
  const composedRef = useComposedRefs(forwardedRef, setScrubberElement);
  const [isScrubbing, setIsScrubbing] = React.useState(false);
  const [isTouchInput, setIsTouchInput] = React.useState(false);
  const [isPointerLockDenied, setIsPointerLockDenied] = React.useState(false);
  const isScrubbingRef = React.useRef(false);
  const didMoveRef = React.useRef(false);
  const pointerDownTargetRef = React.useRef<EventTarget | null>(null);
  const cumulativeDeltaRef = React.useRef(0);
  const cursorCoordinatesRef = React.useRef<PointerCoordinates>({ x: 0, y: 0 });
  const scrubTargetsRef = context?.scrubTargetsRef;
  const contextDisabled = context?.disabled;
  const setRootScrubbing = context?.setScrubbing;
  const shouldRenderCursor =
    isScrubbing && !isTouchInput && !isPointerLockDenied && !isWebKitBrowser();

  const setScrubbingState = React.useCallback(
    (scrubbing: boolean, event: PointerEvent) => {
      flushSync(() => {
        setIsScrubbing(scrubbing);
        setRootScrubbing?.(scrubbing);
      });

      const cursor = cursorRef.current;
      if (!scrubbing || !cursor) {
        return;
      }

      const coordinates = {
        x: event.clientX - cursor.offsetWidth / 2,
        y: event.clientY - cursor.offsetHeight / 2,
      };
      cursorCoordinatesRef.current = coordinates;
      updateCursorTransform(cursor, coordinates);
    },
    [setRootScrubbing],
  );

  const updateCursorPosition = React.useCallback(
    (movementX: number, movementY: number) => {
      const cursor = cursorRef.current;
      const scrubber = scrubberRef.current;

      if (!cursor || !scrubber) {
        return;
      }

      const bounds = getViewportBounds(teleportDistance, scrubber);
      const coordinates = cursorCoordinatesRef.current;
      const nextCoordinates = wrapCursorCoordinates(
        {
          x: Math.round(coordinates.x + movementX),
          y: Math.round(coordinates.y + movementY),
        },
        bounds,
        cursor,
      );

      cursorCoordinatesRef.current = nextCoordinates;
      updateCursorTransform(cursor, nextCoordinates);
    },
    [teleportDistance],
  );

  function handlePointerDown(event: React.PointerEvent<HTMLSpanElement>) {
    onPointerDown?.(event);

    const scrubTarget = getScrubTarget(scrubTargetsRef?.current, scrubberRef.current);
    const isMainButton = event.button === 0;

    if (
      event.defaultPrevented ||
      !isMainButton ||
      contextDisabled ||
      !scrubTarget ||
      scrubTarget.disabled
    ) {
      return;
    }

    const isTouch = event.pointerType === 'touch';
    setIsTouchInput(isTouch);
    setIsPointerLockDenied(false);

    if (event.pointerType === 'mouse') {
      event.preventDefault();
    }

    scrubTarget.startScrub();
    isScrubbingRef.current = true;
    didMoveRef.current = false;
    cumulativeDeltaRef.current = 0;
    pointerDownTargetRef.current = event.nativeEvent.target;
    setScrubbingState(true, event.nativeEvent);

    if (!isTouch && !isWebKitBrowser()) {
      requestPointerLock(scrubberRef.current, setIsPointerLockDenied);
    }
  }

  React.useEffect(() => {
    if (!isScrubbing || !scrubTargetsRef || contextDisabled) {
      return undefined;
    }

    const activeScrubTargetsRef = scrubTargetsRef;
    const scrubTarget = getScrubTarget(activeScrubTargetsRef.current, scrubberRef.current);
    if (!scrubTarget || scrubTarget.disabled) {
      return undefined;
    }

    const ownerWindow = getOwnerWindow(scrubberRef.current);
    if (!ownerWindow) {
      return undefined;
    }

    function handlePointerMove(event: PointerEvent) {
      if (!isScrubbingRef.current) {
        return;
      }

      event.preventDefault();
      updateCursorPosition(event.movementX, event.movementY);
      cumulativeDeltaRef.current += event.movementX;

      if (Math.abs(cumulativeDeltaRef.current) >= pixelSensitivity) {
        const movementX = cumulativeDeltaRef.current;
        cumulativeDeltaRef.current = 0;
        didMoveRef.current = true;

        const activeScrubTarget = getScrubTarget(
          activeScrubTargetsRef.current,
          scrubberRef.current,
        );
        if (movementX !== 0 && activeScrubTarget && !activeScrubTarget.disabled) {
          activeScrubTarget.scrub(movementX, event);
        }
      }
    }

    function handlePointerUp(event: PointerEvent) {
      const ownerDocument = getOwnerDocument(scrubberRef.current);
      if (typeof ownerDocument?.exitPointerLock === 'function') {
        ownerDocument.exitPointerLock();
      }
      isScrubbingRef.current = false;
      setScrubbingState(false, event);
      dispatchClickIfNeeded(pointerDownTargetRef.current, scrubberRef.current, didMoveRef.current);
      didMoveRef.current = false;
      pointerDownTargetRef.current = null;
      cumulativeDeltaRef.current = 0;
    }

    ownerWindow.addEventListener('pointermove', handlePointerMove, true);
    ownerWindow.addEventListener('pointerup', handlePointerUp, true);

    return () => {
      ownerWindow.removeEventListener('pointermove', handlePointerMove, true);
      ownerWindow.removeEventListener('pointerup', handlePointerUp, true);
    };
  }, [
    contextDisabled,
    isScrubbing,
    pixelSensitivity,
    scrubTargetsRef,
    setScrubbingState,
    updateCursorPosition,
  ]);

  React.useEffect(() => {
    const scrubber = scrubberRef.current;
    if (!scrubber || contextDisabled) {
      return undefined;
    }

    function handleTouchStart(event: TouchEvent) {
      if (event.touches.length === 1) {
        event.preventDefault();
      }
    }

    scrubber.addEventListener('touchstart', handleTouchStart);

    return () => {
      scrubber.removeEventListener('touchstart', handleTouchStart);
    };
  }, [contextDisabled]);

  const scrubberStyle: React.CSSProperties = {
    touchAction: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    ...style,
  };
  return (
    <span
      ref={composedRef}
      className={cn(
        'flex shrink-0 items-center self-stretch',
        'cursor-ew-resize',
        'text-figma-secondary icon-figma-secondary',
        // An empty scrubber collapses to a 4px drag strip over the input's left edge;
        // a populated one pushes the input against its content. In a Multi cell the
        // input's 4px inset already accounts for the spec's inter-cell gap.
        'empty:absolute empty:inset-y-0 empty:left-0 empty:z-figma-1 empty:w-1',
        context?.inMulti ? '' : 'not-empty:-mr-2',
        'data-disabled:cursor-default data-disabled:text-figma-disabled data-disabled:icon-figma-disabled',
        className,
      )}
      data-disabled={contextDisabled ? '' : undefined}
      data-scrubbing={isScrubbing ? '' : undefined}
      role="presentation"
      style={scrubberStyle}
      onPointerDown={handlePointerDown}
      {...scrubberProps}
    >
      {children}
      {shouldRenderCursor && portalRoot
        ? createPortal(
            <span
              ref={cursorRef}
              role="presentation"
              data-value-field-cursor
              className={cn(
                'pointer-events-none fixed top-0 left-0 z-2147483647',
                'h-3.5 w-6.5',
                'text-figma-oninverse',
                'drop-shadow-[0_1px_1px_var(--figma-color-bg-inverse)]',
              )}
            >
              <CursorGrowIcon />
            </span>,
            portalRoot,
          )
        : null}
    </span>
  );
}

function requestPointerLock(
  element: HTMLElement | null,
  setPointerLockDenied: (denied: boolean) => void,
) {
  const ownerDocument = getOwnerDocument(element);
  const body = ownerDocument?.body;

  if (!body || !body.requestPointerLock) {
    setPointerLockDenied(true);
    return;
  }

  try {
    void body.requestPointerLock().then(
      () => setPointerLockDenied(false),
      () => setPointerLockDenied(true),
    );
  } catch {
    setPointerLockDenied(true);
  }
}

function getScrubTarget(
  targets: ValueFieldScrubTarget[] | undefined,
  scrubber: HTMLElement | null,
) {
  if (!targets || targets.length === 0) {
    return null;
  }

  if (!scrubber || targets.length === 1) {
    return targets[0] ?? null;
  }

  const root = scrubber.closest('label');
  const scopedTargets = root
    ? targets.filter((target) => target.inputRef.current?.closest('label') === root)
    : targets;

  return getNextScrubTarget(scopedTargets, scrubber) ?? scopedTargets[0] ?? null;
}

function getNextScrubTarget(targets: ValueFieldScrubTarget[], scrubber: HTMLElement) {
  return (
    targets.find((target) => {
      const input = target.inputRef.current;
      return input
        ? (scrubber.compareDocumentPosition(input) & DOCUMENT_POSITION_FOLLOWING) !== 0
        : false;
    }) ?? null
  );
}

function dispatchClickIfNeeded(
  target: EventTarget | null,
  element: HTMLElement | null,
  didMove: boolean,
) {
  if (didMove || !target) {
    return;
  }

  const ownerWindow = getOwnerWindow(element);
  if (!ownerWindow) {
    return;
  }

  target.dispatchEvent(new ownerWindow.MouseEvent('click', { bubbles: true, cancelable: true }));
}

function updateCursorTransform(cursor: HTMLElement, coordinates: PointerCoordinates) {
  cursor.style.transform = `translate3d(${coordinates.x}px,${coordinates.y}px,0)`;
}

function wrapCursorCoordinates(
  coordinates: PointerCoordinates,
  bounds: ViewportBounds,
  cursor: HTMLElement,
) {
  const nextCoordinates = { ...coordinates };
  const halfWidth = cursor.offsetWidth / 2;
  const halfHeight = cursor.offsetHeight / 2;

  if (nextCoordinates.x + halfWidth < bounds.left) {
    nextCoordinates.x = bounds.right - halfWidth;
  } else if (nextCoordinates.x + halfWidth > bounds.right) {
    nextCoordinates.x = bounds.left - halfWidth;
  }

  if (nextCoordinates.y + halfHeight < bounds.top) {
    nextCoordinates.y = bounds.bottom - halfHeight;
  } else if (nextCoordinates.y + halfHeight > bounds.bottom) {
    nextCoordinates.y = bounds.top - halfHeight;
  }

  return nextCoordinates;
}

function getViewportBounds(
  teleportDistance: number | undefined,
  element: HTMLElement,
): ViewportBounds {
  const rect = element.getBoundingClientRect();

  if (teleportDistance !== undefined) {
    return {
      left: rect.left - teleportDistance / 2,
      top: rect.top - teleportDistance / 2,
      right: rect.right + teleportDistance / 2,
      bottom: rect.bottom + teleportDistance / 2,
    };
  }

  const ownerWindow = getOwnerWindow(element);
  const visualViewport = ownerWindow?.visualViewport;

  if (visualViewport) {
    return {
      left: visualViewport.offsetLeft,
      top: visualViewport.offsetTop,
      right: visualViewport.offsetLeft + visualViewport.width,
      bottom: visualViewport.offsetTop + visualViewport.height,
    };
  }

  return {
    left: 0,
    top: 0,
    right: element.ownerDocument.documentElement.clientWidth,
    bottom: element.ownerDocument.documentElement.clientHeight,
  };
}

function getOwnerDocument(element: HTMLElement | null) {
  if (element) {
    return element.ownerDocument;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return document;
}

function getOwnerWindow(element: HTMLElement | null) {
  const ownerDocument = getOwnerDocument(element);
  return ownerDocument?.defaultView ?? null;
}

function getPortalRoot(element: HTMLElement | null) {
  return getOwnerDocument(element)?.body ?? null;
}

function isWebKitBrowser() {
  return (
    typeof navigator !== 'undefined' &&
    /AppleWebKit/i.test(navigator.userAgent) &&
    !/(Chrome|Chromium|Edg|OPR|Firefox|HappyDOM)/i.test(navigator.userAgent)
  );
}

function CursorGrowIcon() {
  return (
    <svg
      className="block h-3.5 w-6.5 fill-figma-bg-inverse stroke-figma-text-oninverse"
      width="26"
      height="14"
      viewBox="0 0 26 14"
      aria-hidden="true"
    >
      <path d="M20.5 5.5H6.5V2L1 7L6.5 12V8.5H20.5V12L26 7L20.5 2V5.5Z" />
    </svg>
  );
}

Scrubber.displayName = 'ValueField.Scrubber';

export { Scrubber };
export type { ScrubberProps };
