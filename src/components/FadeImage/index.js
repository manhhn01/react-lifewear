/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function FadeImage({ src, className = '', ...props }) {
  const prevRef = useRef(src);
  const [prevSrc, setPrevSrc] = useState(src);
  const [showTopImage, setShowTopImage] = useState(false);

  useLayoutEffect(() => {
    if (src !== prevRef.current) {
      setShowTopImage(true);
    }
  }, [src]);

  useEffect(() => {
    prevRef.current = prevSrc;
  }, [prevSrc]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={src}
        className={
          'absolute block top-0 object-cover w-full h-full left-0 ' + className
        }
        {...props}
      />
      <CSSTransition
        in={showTopImage}
        classNames={{
          exitActive: 'opacity-0',
        }}
        onEnter={() => {
          setShowTopImage(false);
        }}
        onExited={() => {
          setPrevSrc(src);
        }}
        timeout={{
          exit: 150,
          enter: 0,
        }}
        mountOnEnter
        unmountOnExit
      >
        <img
          src={prevSrc}
          className={
            className +
            ' absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-150 '
          }
          {...props}
          onTransitionEnd={() => {
            console.log('end');
            setPrevSrc(src);
            setShowTopImage(false);
          }}
        />
      </CSSTransition>
    </div>
  );
}

export default FadeImage;
