import React, { useId } from 'react';

function RadioButton({
  name,
  title,
  icon = null,
  className = '',
  checked,
  defaultChecked,
  onChange,
  ...props
}) {
  const id = useId();
  return (
    <div className={'relative ' + className} {...props}>
      <input
        id={id}
        className="hidden group peer"
        type="radio"
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />

      <label
        className="flex px-5 py-2 mb-3 leading-7 transition-colors border-2 border-gray-100 rounded-sm cursor-pointer peer-checked:border-secondary hover:bg-gray-50"
        htmlFor={id}
      >
        {icon}
        <span>{title}</span>
      </label>

      <svg
        className="absolute w-5 h-5 opacity-0 top-3.5 right-4 peer-checked:opacity-100 text-secondary"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default RadioButton;
