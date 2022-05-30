import React, { useId } from 'react';

function CheckBox({ label = null }) {
  const id = useId();

  return (
    <div className="flex justify-start">
      <div className="form-check">
        <input
          className="float-left w-4 h-4 mt-0.5 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-secondary checked:border-secondary focus:outline-none"
          type="checkbox"
          defaultValue
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")`,
          }}
          id={id}
        />
        {label && (
          <label
            className="inline-block text-gray-800 form-check-label"
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
}

export default CheckBox;
