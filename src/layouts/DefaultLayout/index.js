import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

function DefaultLayout({ transparentHeader, noFooter = false }) {
  const location = useLocation();
  return (
    <div>
      <Header transparent={transparentHeader} />
      {/* <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames={
            !location.state?.noTrans
              ? {
                  enter: 'opacity-0 -translate-y-5',
                  enterActive:
                    'transition-all duration-300 !opacity-100 !translate-y-0',
                  exit: 'hidden',
                }
              : {
                  exit: 'hidden',
                }
          }
        > */}
      <Main paddingTop={!transparentHeader}>
        <Outlet />
      </Main>
      {/* </CSSTransition>
      </TransitionGroup> */}
      {!noFooter && <Footer />}
    </div>
  );
}

export default DefaultLayout;
