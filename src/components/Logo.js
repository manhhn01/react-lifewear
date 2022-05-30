import React from 'react';

export const Logo = ({ black: isBlack }) => {
  return (
    <div className="h-full relative">
      <img
        src="/logo.png"
        alt="Lifewear"
        className={
          'pointer-events-none max-h-full object-contain transition-all duration-300 group-hover:opacity-0 ' +
          (isBlack ? 'opacity-0' : 'opacity-100')
        }
      />
      <img
        src="/logo-black.png"
        alt="Lifewear"
        className={
          'pointer-events-none absolute top-0 left-0 max-h-full object-contain group-hover:opacity-100 transition-all duration-300 ' +
          (isBlack ? 'opacity-100' : 'opacity-0')
        }
      />
    </div>
  );
};
