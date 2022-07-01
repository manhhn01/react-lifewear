import React, { useEffect, useMemo } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LazyImage from '../../components/LazyImage';
import { removeCart, updateCartQuantity } from '../../reducer/cartSlice';
import { currencyFormat, random } from '../../utils';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const cartTotal = useMemo(
    () =>
      cart.products.reduce(
        (sum, current) =>
          (sum +=
            (current.sale_price || current.price) * current.cart_quantity),
        0
      ),
    [cart]
  );

  const r1 = useMemo(
    () => Array(cart.length).map(() => random(0, 1)),
    [cart.length]
  );
  const r2 = useMemo(
    () => Array(cart.length).map(() => random(1, 15)),
    [cart.length]
  );

  const dispatch = useDispatch();

  return (
    <div className="container px-10 pt-10 mx-auto">
      <Link to={'/'} className="block text-lg text-center text-gray-700">
        Trang chủ
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-center uppercase basis-full text-secondary">
        Giỏ hàng
      </h1>
      {cart.products.length > 0 ? (
        <div className="flex flex-wrap">
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between">
              <h2>
                Đơn hàng của bạn có{' '}
                <span className="text-secondary-darker">{`(${cart.products?.length}) sản phẩm`}</span>
              </h2>
              <Link
                to="/"
                type="button"
                className="flex items-center px-3 py-2 transition-colors rounded text-secondary-lighter border-secondary-lighter hover:text-secondary-lighter"
              >
                <span className="pt-0.5">Tiếp tục mua hàng</span>
                <BiRightArrowAlt className="text-xl" />
              </Link>
            </div>
            <ul className="py-6">
              <div className="flex px-4 py-3 mb-4 font-semibold uppercase border-t border-b border-slate-200 bg-slate-50">
                <div className="w-[6rem]">Sản phẩm</div>
                <div className="flex flex-1">
                  <div className="flex-1"></div>
                  <div className="w-1/4 text-center">Số lượng</div>
                  <div className="w-1/6 text-center">Đơn giá</div>
                  <div className="w-[18%] text-right">Tổng</div>
                </div>
              </div>
              {cart.products.map((product, index) => (
                <li key={product.variant_id}>
                  <div className="flex">
                    <div className="relative w-[6rem] h-[8rem] mr-4">
                      <LazyImage alt={product.name} src={product.cover} />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center">
                          <div className="flex-1">
                            <Link
                              to={'/' + product.slug}
                              className="mb-2 text-truncate-2"
                            >
                              {product.name}
                            </Link>
                          </div>
                          <div className="w-1/4">
                            <div className="flex items-center">
                              <div className="inline-flex mx-2 text-xl rounded-md bg-gray-50">
                                <button
                                  type="button"
                                  className="pt-1 rounded-md w-9 h-9"
                                  onClick={() => {
                                    dispatch(
                                      updateCartQuantity({
                                        product,
                                        cart_quantity:
                                          parseInt(product.cart_quantity) - 1,
                                      })
                                    );
                                  }}
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  className="w-8 pt-1 text-base text-center bg-transparent border-none outline-none"
                                  value={product.cart_quantity}
                                  onChange={({ target }) => {
                                    dispatch(
                                      updateCartQuantity({
                                        product,
                                        cart_quantity: parseInt(
                                          target.value || 1
                                        ),
                                      })
                                    );
                                  }}
                                />
                                <button
                                  type="button"
                                  className="pt-1 rounded-md w-9 h-9"
                                  onClick={() => {
                                    dispatch(
                                      updateCartQuantity({
                                        product,
                                        cart_quantity:
                                          parseInt(product.cart_quantity) + 1,
                                      })
                                    );
                                  }}
                                >
                                  +
                                </button>
                              </div>
                              {/* <div className="text-gray-500">
                      {selectedVariant.quantity} sản phẩm có sẵn
                      2 sản phẩm có sẵn
                    </div> */}
                            </div>
                          </div>
                          <div className="w-1/6 font-medium text-secondary-lighter">
                            {currencyFormat(
                              product.sale_price || product.price
                            ) + 'đ'}
                          </div>
                          <div className="w-[18%] text-right text-secondary font-medium">
                            {currencyFormat(
                              (product.sale_price || product.price) *
                                product.cart_quantity
                            ) + 'đ'}
                          </div>
                        </div>
                        <span className="px-4 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-sm self-baseline">
                          {product.color.name + ' / ' + product.size.name}
                        </span>
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="inline-flex items-center text-red-700"
                          onClick={() => {
                            dispatch(removeCart({ product }));
                          }}
                        >
                          <FiTrash2 className="mb-1 mr-2" />
                          <span className="">Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* notif */}
                  {r1[index] === 0 && (
                    <div className="relative px-4 py-2 text-white bg-orange-500/60 pr-14">
                      <p className="text-sm font-medium text-left sm:text-center">
                        {r2[index]} người khác đang có sản phẩm này trong giỏ
                        hàng.{' '}
                        <Link
                          className="font-medium underline"
                          to={'/checkout'}
                        >
                          Thanh toán ngay
                        </Link>{' '}
                        trước khi hết hàng nhé!
                      </p>
                    </div>
                  )}
                  {/* /notif */}

                  {index !== cart.products.length - 1 && (
                    <div className="my-4 border-b"></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/3">
            <div className="sticky px-6 py-8 overflow-hidden border border-gray-100 rounded-lg shadow-sm top-36 lg:ml-10">
              <div className="flex justify-between mb-4">
                <h3>Tổng cộng</h3>
                <span className="font-medium text-secondary">
                  {currencyFormat(cartTotal) + 'đ'}
                </span>
              </div>
              <div className="w-full mb-2">
                <Link
                  to={'/checkout'}
                  className="block w-full py-3 text-lg text-center text-white transition-colors rounded hover:bg-secondary-lighter bg-secondary"
                >
                  Thanh toán
                </Link>
              </div>
              <div className="text-sm italic text-center text-gray-600">
                {1000000 - cartTotal > 0
                  ? 'Mua thêm ' +
                    currencyFormat(1000000 - cartTotal) +
                    ' đ để được miễn phí vận chuyển'
                  : 'Miễn phí vận chuyển'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <div className="flex flex-col items-center mb-4">
            <GiShoppingCart size="4rem" className="mb-2" />
            <div className="mb-2 text-sm">Giỏ hàng của bạn trống.</div>
          </div>
          <Link
            to="/"
            className="px-4 py-2 text-lg text-white transition-colors rounded bg-secondary text-md hover:bg-secondary-lighter"
          >
            Tiếp tục mua hàng
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
