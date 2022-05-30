import React from 'react';

function Main({ children, paddingTop, ...props }) {
  return (
    <div id="content" className={paddingTop ? 'pt-24' : ''} {...props}>
      {children}
    </div>
  );
}

export default Main;
