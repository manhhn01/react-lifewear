import React from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

function Filter({
  onFilterUpdate,
  filter,
  name,
  title,
  options,
  multiple = true,
  ...props
}) {
  return (
    <div {...props}>
      <div className="flex justify-between mb-2 text-lg">
        {title}
        <button
          type="button"
          onClick={() => {
            onFilterUpdate({ type: 'toggleShow', payload: { name } });
          }}
        >
          {filter.show ? <BiMinus /> : <BiPlus />}
        </button>
      </div>
      <ul
        className={
          'flex flex-wrap -m-1 transition-all duration-300 ' +
          (filter.show
            ? 'max-h-32 opacity-100 overflow-auto'
            : 'max-h-0 opacity-0 overflow-hidden')
        }
      >
        {options.map((option) => {
          let selected = [...filter.selected].includes(option.key);
          return (
            <li
              className={
                'm-1 border-2 rounded-[0.2rem] ' +
                (selected
                  ? 'border-secondary-lighter text-secondary-lighter'
                  : 'border-gray-300 text-gray-600')
              }
              key={option.key}
            >
              <button
                className="flex items-center justify-center px-3 text-sm text-left py-1.5"
                type="button"
                onClick={() => {
                  onFilterUpdate(
                    multiple
                      ? selected
                        ? {
                            type: 'remove',
                            payload: { name, value: option.key },
                          }
                        : {
                            type: 'add',
                            payload: { name, value: option.key },
                          }
                      : selected
                      ? {
                          type: 'only',
                          payload: { name, value: null },
                        }
                      : {
                          type: 'only',
                          payload: { name, value: option.key },
                        }
                  );
                }}
              >
                {option.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Filter;
