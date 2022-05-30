import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function LazyImage({
  src,
  alt,
  className = '',
  placeholder = null,
  backgroundImage = false,
  ...props
}) {
  const element = useRef(null);
  const topElement = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);

  const handleLoaded = ({ target }) => {
    if (target.complete && target.naturalHeight !== 0) {
      setLoaded(true);

      target.removeEventListener('loaded', handleLoaded);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          observer.unobserve(entries[0].target);
        }
      },
      {
        rootMargin: '-20px',
      }
    );

    observer.observe(element.current);
  }, []);

  return (
    <>
      {backgroundImage && loaded ? (
        <div
          className={'absolute top-0 left-0 ' + className}
          style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover' }}
          {...props}
        ></div>
      ) : (
        <img
          ref={element}
          className={'absolute top-0 left-0 ' + className}
          src={show ? src : null}
          alt={alt}
          {...props}
          onLoad={handleLoaded}
        />
      )}
      <CSSTransition
        in={!loaded}
        classNames={{
          exit: 'opacity-0',
        }}
        timeout={{
          exit: 150,
        }}
        unmountOnExit
        nodeRef={topElement}
      >
        <img
          ref={topElement}
          className={'absolute top-0 left-0 transition-opacity ' + className}
          src={placeholder || '/placeholder.jpg'}
          alt={alt}
          {...props}
        />
      </CSSTransition>
    </>
  );
}

export default LazyImage;
