import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DropDown from '../../../../components/DropDown';
import { removeCart } from '../../../../reducer/cartSlice';
import { hidePopup, togglePopup } from '../../../../reducer/popupSlice';
import { currencyFormat } from '../../../../utils';

function CartButton({ invertColor = false }) {
  const cart = useSelector((state) => state.cart);
  const popup = useSelector(state=>state.popup)
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <button
        type="button"
        className="relative p-3 "
        onClick={(event) => {
          event.stopPropagation();
          dispatch(togglePopup('cartPopup'));
        }}
      >
        <div className="flex items-center">
          <AiOutlineShoppingCart size="1.2rem" />
          {cart.products.length > 0 && (
            <div
              className={
                'ml-1 text-center w-4 h-4 leading-4 transition-all duration-500 group-hover:bg-black group-hover:text-white/80 rounded-full ' +
                (invertColor
                  ? 'text-white/80 bg-black'
                  : 'text-black/80 bg-white')
              }
            >
              <span className="pt-0.5 text-xs leading-4">
                {cart.products.length}
              </span>
            </div>
          )}
        </div>
      </button>
      <DropDown
        show={popup === 'cartPopup'}
        position="bl"
        className="cursor-auto w-[28rem]"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {cart.products.length > 0 ? (
          <>
            <ul className="flex flex-col p-4 pb-0 overflow-auto text-left max-h-[70vh] mb-4">
              {cart.products.map((product) => (
                <li className="flex mb-4 last:mb-0" key={product.variant_id}>
                  <div
                    className="w-[6rem] mr-2 h-[8rem] "
                    style={{
                      backgroundImage: `url('${product.cover}')`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <div className="flex flex-col flex-1">
                    <Link
                      to={'/' + product.slug}
                      onClick={() => {
                        dispatch(hidePopup());
                      }}
                      className="h-12 mb-1 leading-5 text-truncate-2"
                    >
                      {product.name}
                    </Link>
                    <div>
                      <span className="font-semibold text-secondary">
                        {currencyFormat(product.sale_price || product.price) +
                          'đ'}
                      </span>
                      {!!product.sale_price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {currencyFormat(product.price) + 'đ'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex items-center justify-between">
                      <div className="px-4 py-1 text-sm text-gray-700 bg-gray-100 rounded-sm self-baseline">
                        {product.color.name + ' / ' + product.size.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        SL: {product.cart_quantity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-10">
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(removeCart({ product }));
                      }}
                    >
                      <FiTrash2 className="text-red-700" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/cart"
              className="transition-color duration-200 text-center w-[calc(100%_-_2rem)] block mx-auto px-4 py-2 mb-4 text-gray-700 transition-colors bg-white border border-gray-700 rounded-sm text-md hover:text-secondary hover:border-secondary"
              onClick={() => {
                dispatch(hidePopup());
              }}
            >
              Xem giỏ hàng
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-gray-500">
            <div className="flex flex-col items-center py-2">
              <GiShoppingCart size="4rem" className="mb-2" />
              <div className="mb-2 text-sm">Giỏ hàng của bạn trống.</div>
            </div>
            <button className="px-4 py-2 text-lg text-gray-700 transition-colors border border-gray-700 rounded-sm text-md hover:text-secondary hover:border-secondary">
              Tiếp tục mua hàng
            </button>
          </div>
        )}
      </DropDown>
    </div>
  );
}

export default CartButton;
