import React, { useId } from 'react';

function Input({
  label = null,
  className = '',
  type = 'text',
  error = '',
  ...props
}) {
  const id = useId();
  return (
    <div className={'flex flex-col mb-3 ' + className}>
      {label && (
        <label
          htmlFor={id}
          className="block ml-2 text-lg font-medium text-gray-600"
        >
          {label}
        </label>
      )}
      <div
        className="flex transition-all duration-300 border-2 rounded-sm focus-within:border-secondary-lighter focus-within:bg-gray-50/50"
        style={{ borderColor: error ? '#bf4b1a' : null }}
      >
        <input
          id={id}
          {...props}
          className="flex-1 w-full px-5 py-2 leading-7 outline-none placeholder:transition-all placeholder:duration-300 focus:placeholder:text-accent"
          type={type}
        />
      </div>
      {error && <p className="mt-1 ml-2 text-sm text-secondary-darker/80">{error}</p>}
    </div>
  );
}

export default Input;
