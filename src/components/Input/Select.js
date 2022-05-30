import React, { useId } from 'react';

function Select({ children, error = '', ...props }) {
  const id = useId();
  return (
    <div className="mb-3">
      <>
        <select
          required
          className="border-gray-200 invalid:text-gray-400 disabled:text-gray-400 disabled:bg-gray-200 px-5 py-2 h-12 leading-7 bg-white relative rounded border-2 w-full focus:z-10 outline-none p-2.5"
          id={id}
          {...props}
          style={{ borderColor: error ? '#bf4b1a' : null }}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 ml-2 text-sm text-secondary-darker/80">{error}</p>
        )}
      </>
    </div>
  );
}

export default Select;
