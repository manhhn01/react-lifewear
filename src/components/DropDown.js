import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

function DropDown({
  show = false,
  children,
  position = 'r',
  className = '',
  ...props
}) {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={{
        enter: 'opacity-0',
        enterActive: 'opacity-100',
        exit: 'opacity-0',
      }}
      in={show}
      timeout={{
        enter: 150,
        exit: 300,
      }}
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef} className="transition-opacity duration-300">
        <span
          className={
            'absolute block border-[6px] border-transparent border-b-white bottom-0 left-1/2 -translate-x-1/2 z-[41] '
          }
        ></span>
        <div
          className={`absolute bg-white z-40 shadow-around text-black w-max rounded-sm ${className} ${
            position === 'r' ? 'left-0' : 'right-0'
          }`}
          {...props}
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  );
}

export default DropDown;
