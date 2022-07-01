import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DropDown from '../../../../components/DropDown';
import { hidePopup, togglePopup } from '../../../../reducer/popupSlice';
import { removeWishlist } from '../../../../reducer/wishlistSlice';
import { currencyFormat } from '../../../../utils';

function WishlistButton({ invertColor = false }) {
  const auth = useSelector((state) => state.auth);
  const popup = useSelector((state) => state.popup);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <button
        type="button"
        className="block p-3"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(togglePopup('wishlistPopup'));
        }}
      >
        <div className="flex items-center">
          <AiOutlineHeart size="1.2rem" />
          {wishlist.products.length > 0 && (
            <div
              className={
                'ml-1 text-center w-4 h-4 leading-4 transition-all duration-500 group-hover:bg-black group-hover:text-white/80 rounded-full ' +
                (invertColor
                  ? 'text-white/80 bg-black'
                  : 'text-black/80 bg-white')
              }
            >
              <span className="pt-0.5 text-xs leading-4">
                {wishlist.products.length}
              </span>
            </div>
          )}
        </div>
      </button>
      <DropDown
        show={popup === 'wishlistPopup'}
        position="bl"
        className="cursor-auto w-[28rem]"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {auth.logged ? (
          wishlist.products.length > 0 ? (
            <>
              <ul className="flex flex-col p-4 pb-0 overflow-auto text-left max-h-[70vh] mb-4">
                {wishlist.products.map((product) => (
                  <li className="flex mb-4 last:mb-0" key={product.id}>
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
                        className="h-12 mb-1 leading-5 text-truncate-2"
                        onClick={() => {
                          dispatch(hidePopup());
                        }}
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
                        {/*  */}
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-10">
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeWishlist({ product }));
                        }}
                      >
                        <FiTrash2 className="text-red-700" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {/* <button className="w-[calc(100%_-_2rem)] block mx-auto px-4 py-2 mb-4 text-gray-700 transition-colors bg-white border border-gray-700 rounded-sm text-md hover:text-secondary hover:border-secondary">
                Xem sản phẩm yêu thích
              </button> */}
            </>
          ) : (
            <div className="flex flex-col items-center py-6 text-gray-500">
              <div className="flex flex-col items-center py-2">
                <BsHeart size="3rem" className="mb-2" />
                <div className="mb-2 text-sm">
                  Bạn chưa có sản phẩm yêu thích nào
                </div>
              </div>
              <Link
                to="/"
                onClick={() => {
                  dispatch(hidePopup());
                }}
                className="px-4 py-2 text-gray-700 transition-colors border border-gray-700 rounded-sm text-md hover:text-secondary hover:border-secondary"
              >
                Tiếp tục mua hàng
              </Link>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center py-6 text-gray-500">
            <div className="flex flex-col items-center py-2">
              <BsHeart size="3rem" className="mb-2" />
              <div className="mb-2 text-sm">
                Bạn cần đăng nhập để sử dụng tính năng này.
              </div>
            </div>
            <Link
              to="/user/login"
              onClick={() => {
                dispatch(hidePopup());
              }}
              className="px-4 py-2 text-gray-700 transition-colors border border-gray-700 rounded-sm text-md hover:text-secondary hover:border-secondary"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </DropDown>
    </div>
  );
}

export default WishlistButton;
