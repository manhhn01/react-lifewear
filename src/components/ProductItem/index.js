import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from 'react-icons/ai';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage';
import { currencyFormat } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addWishlist, removeWishlist } from '../../reducer/wishlistSlice';

import './style.css';

function ProductItem({
  id,
  slug,
  price,
  salePrice,
  cover,
  name,
  placeholder = false,
  options,
  showModal = true,
  onModalShow,
  onClick = null,
  onAddToWishlist,
  onRemoveFromWishlist,
}) {
  const [selectedVariant, setSelectedVariant] = useState(-1);
  const wished = useSelector((state) =>
    state.wishlist.products.some((wProduct) => wProduct.id === id)
  );
  const dispatch = useDispatch();

  const handleAddToWishlist = (product) => {
    dispatch(
      addWishlist({
        product,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Đã sản phẩm vào danh sách yêu thích');
      })
      .catch((err) => {
        toast.error(err.message);
        throw err;
      });
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(
      removeWishlist({
        product,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
      })
      .catch((err) => {
        toast.error(err.message);
        throw err;
      });
  };

  return (
    <Link
      onClick={onClick}
      to={`/${!placeholder ? slug : '#'}`}
      className={
        'group-product ' +
        (placeholder ? 'pointer-events-none' : 'pointer-events-auto')
      }
    >
      <div className="relative pt-[133%] rounded-t-sm overflow-hidden">
        <LazyImage
          className="top-0 left-0 z-0 object-cover w-full h-full "
          src={
            !placeholder
              ? selectedVariant !== -1
                ? options.colors.find((color) => color.id === selectedVariant)
                    .cover
                : cover
              : '/placeholder.jpg'
          }
          alt={name}
        />
        {!placeholder && (
          <>
            <div
              className="action-buttons absolute right-0 z-10 flex flex-col transition-all duration-[400ms] opacity-0 pointer-events-none top-4"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              {showModal && (
                <button
                  type="button"
                  className="flex items-center justify-center mb-2 bg-white rounded-full shadow-sm w-9 h-9"
                  onClick={(event) => {
                    onModalShow(id, event);
                  }}
                >
                  <AiOutlineEye />
                </button>
              )}
              <button
                type="button"
                className="flex items-center justify-center bg-white rounded-full shadow-sm w-9 h-9"
                onClick={() => {
                  if (wished)
                    handleRemoveFromWishlist({
                      id,
                      slug,
                      price,
                      salePrice,
                      cover,
                      name,
                    });
                  else
                    handleAddToWishlist({
                      id,
                      slug,
                      price,
                      salePrice,
                      cover,
                      name,
                    });
                }}
              >
                {wished ? (
                  <AiFillHeart className="text-secondary" />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            </div>
          </>
        )}
      </div>
      {!placeholder ? (
        <div
          className={
            'relative pt-4 bg-white bottom-0 ' +
            (options?.colors?.length > 1
              ? 'options-wrapper transition-all duration-300'
              : '')
          }
        >
          <h3 className="mb-2 px-2 text-sm leading-5 text-center h-[2.5rem] text-truncate-2">
            {name}
          </h3>
          <div className="text-center">
            <span className="text-base font-semibold after:content-['_'] text-secondary-darker">
              {currencyFormat(salePrice || price) + ' đ'}
            </span>
            {salePrice && (
              <span className="inline-block ml-2 text-sm font-medium text-gray-600 line-through">
                {currencyFormat(price) + ' đ'}
              </span>
            )}
          </div>
          <div
            className="absolute left-0 right-0 flex items-center justify-center overflow-hidden transition-opacity ease-in opacity-0 pointer-events-none options top-full"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            {options?.colors?.length > 1 &&
              options?.colors?.slice(0, 4).map((color) => (
                <button
                  type="button"
                  className={
                    'h-11 w-11 border-2 overflow-hidden rounded-md m-1 p-0.5 ' +
                    (color.id === selectedVariant
                      ? 'border-secondary'
                      : 'border-gray-100')
                  }
                  onClick={(event) => {
                    setSelectedVariant((selected) =>
                      selected === color.id ? -1 : color.id
                    );
                  }}
                  key={color.id}
                >
                  <img
                    className="block object-cover w-full h-full"
                    src={color.cover}
                    alt={color.name}
                  />
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="relative bottom-0 pt-4">
          <div className="mx-auto w-[calc(100%_-_1.5rem)] h-6 my-1 bg-gray-100 rounded-md relative overflow-hidden after:skeleton-loading"></div>
          <div className="relative h-6 mx-auto my-1 overflow-hidden bg-gray-100 rounded-md mb-7 w-36 after:skeleton-loading"></div>
        </div>
      )}
    </Link>
  );
}

export default ProductItem;
