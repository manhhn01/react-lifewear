import React from 'react';

function Pill({ type = 0, title = '', className = '', ...props }) {
  const getTypeClass = () => {
    switch (type) {
      case 0:
        return 'text-white bg-yellow-500';
      case 1:
        return 'text-white bg-blue-500';
      case 2:
        return 'text-white bg-green-500';
      case 3:
        return 'text-white bg-red-500';
      default:
        return '';
    }
  };
  return (
    <span
      {...props}
      className={
        'inline-block rounded-full px-4 py-1 text-sm ' +
        className +
        ' ' +
        getTypeClass()
      }
    >
      {title}
    </span>
  );
}

export default Pill;
