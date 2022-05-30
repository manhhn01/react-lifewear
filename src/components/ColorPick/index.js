import React from 'react';

function ColorPick({ selectedColor, colors, onSelectedColorChange }) {
  return (
    <div className="mb-4">
      <div className="pb-2">
        Màu sắc: <span className="">{selectedColor.name}</span>
      </div>
      <ul className="flex flex-wrap">
        {colors.map((color) => (
          <li
            className={
              'w-12 h-12 rounded-full p-[0.15rem] mr-2 overflow-hidden mb-2 ' +
              (color.id === selectedColor.id
                ? 'border-2 border-secondary'
                : '')
            }
            onClick={() => onSelectedColorChange(color)}
            key={color.id}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundImage: `url(${color.cover})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ColorPick;
