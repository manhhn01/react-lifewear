import React, { useId } from 'react';

function TextArea({ className = '', label, ...props }) {
  const id = useId();
  return (
    <div className={'flex flex-col ' + className}>
      {label && (
        <label
          htmlFor={id}
          className="block ml-2 text-lg font-medium text-gray-600"
        >
          {label}
        </label>
      )}
      <div className="flex mb-3 transition-all duration-300 border-2 rounded-sm focus-within:border-secondary-lighter focus-within:bg-gray-50/50">
        <textarea
          id={id}
          {...props}
          className="flex-1 w-full px-5 py-2 leading-7 outline-none placeholder:transition-all placeholder:duration-300 focus:placeholder:text-accent "
          name="phone"
        ></textarea>
      </div>
    </div>
  );
}

export default TextArea;
