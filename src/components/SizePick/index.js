import React, { useEffect, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import * as SizeTable from './sizeTable';

function SizePick({
  selectedSize,
  sizes,
  onSelectedSizeChange,
  sizeType = 'maleSize',
}) {
  const [height, setHeight] = useState(150);
  const [weight, setWeight] = useState(50);
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestSize, setSuggestSize] = useState(null);

  useEffect(() => {
    setSuggestSize(
      SizeTable['maleSizes'].find(
        ({ h, w }) =>
          height >= h[0] && height <= h[1] && weight >= w[0] && weight <= w[1]
      ) || null
    );
  }, [height, weight]);

  return (
    <div className="mb-6">
      <div className="flex mb-2">
        <div className="flex flex-1">
          <div className="mr-10">
            Kích thước: <span className="">{selectedSize.name}</span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setShowSuggest(!showSuggest);
            }}
          >
            <span className="mr-2">Gợi ý tìm size</span>
            {showSuggest ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </div>
        </div>
      </div>

      {/* Size suggest */}
      <div
        className={
          'border-dashed border-secondary overflow-hidden transition-all duration-300 ' +
          (showSuggest
            ? 'border-2 max-h-60 mb-2 p-7'
            : 'border-0 max-h-0 opacity-0')
        }
      >
        <div className="flex flex-col pb-6">
          <div className="flex justify-between">
            <div className="mb-3">Chiều cao</div>
            <div>{height}cm</div>
          </div>
          <input
            className="slider"
            type="range"
            min="145"
            max="185"
            style={{
              background: `linear-gradient(
                to right, #ff670f 0%,
                #ff670f ${2.5 * (height - 145)}%,
                #f2f2f2 ${2.5 * (height - 145)}%,
                #f2f2f2 100%
                )`,
            }}
            value={height}
            onChange={({ target }) => {
              setHeight(target.value);
            }}
          />
        </div>
        <div className={'flex flex-col ' + (suggestSize ? 'pb-8' : 'pb-6')}>
          <div className="flex justify-between">
            <div className="mb-3">Cân nặng</div>
            <div>{weight}kg</div>
          </div>
          <input
            className="slider"
            type="range"
            min="40"
            max="90"
            style={{
              background: `linear-gradient(
                to right, #ff670f 0%,
                #ff670f ${2 * (weight - 40)}%,
                #f2f2f2 ${2 * (weight - 40)}%,
                #f2f2f2 100%
                )`,
            }}
            value={weight}
            onChange={({ target }) => {
              setWeight(target.value);
            }}
          />
        </div>
        {suggestSize && (
          <div className="flex items-center justify-center cursor-default">
            <div className="mr-4">Kích cỡ gợi ý:</div>
            <div className="text-2xl border-[3px] border-secondary/75 rounded-[0.2rem] text-secondary/75 h-10 min-w-10 px-1 flex justify-center items-center">
              {suggestSize.name}
            </div>
          </div>
        )}
      </div>
      {/* /Size suggest */}

      <ul className="flex">
        {sizes.map((size) => (
          <li
            className={
              'min-w-[2.5rem] h-10 px-2 pt-0.5 mr-2 overflow-hidden rounded ' +
              (size.available
                ? size.id === selectedSize.id
                  ? 'text-white bg-secondary'
                  : 'bg-gray-100 text-gray-700'
                : 'bg-gray-50 text-gray-300')
            }
            onClick={size.available ? () => onSelectedSizeChange(size) : null}
            key={size.id}
          >
            <button className={ "leading-9 w-full h-full " + (size.available ? '':'cursor-default')}>
              {size.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SizePick;
