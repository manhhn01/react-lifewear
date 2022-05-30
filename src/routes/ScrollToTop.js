import React, { useLayoutEffect } from 'react';
import {
  NavigationType,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

function ScrollToTop({ children }) {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (
      navigationType !== NavigationType.Pop &&
      navigationType !== NavigationType.Replace &&
      !location.state?.noScroll
    ) {
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  return <>{children}</>;
}

export default ScrollToTop;
