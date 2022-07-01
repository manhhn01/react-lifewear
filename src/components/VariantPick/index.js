import React, { useMemo, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiCheckDouble } from 'react-icons/bi';
import { BsCartPlus, BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../reducer/cartSlice';
import { addWishlist, removeWishlist } from '../../reducer/wishlistSlice';
import { currencyFormat } from '../../utils';
import ColorPick from '../ColorPick';
import SizePick from '../SizePick';
import { useNavigate } from 'react-router-dom';

function VariantPick({ product, onPreviewImageChange, ...props }) {
  const navigate = useNavigate();
  const [quantity, updateQuantity] = useReducer((state, action) => {
    switch (action.type) {
      case 'inc':
        return action.payload.max > state ? parseInt(state) + 1 : state;
      case 'dec':
        return state === 1 ? 1 : state - 1;
      case 'set':
        return action.payload.value > action.payload.max
          ? action.payload.max
          : action.payload.value <= 0
          ? 1
          : action.payload.value;
      default:
        throw new Error('Unknown action: ' + action.type);
    }
  }, 1);
  const [selectedSize, setSelectedSize] = useState(product.options.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.options.colors[0]);
  const wished = useSelector((state) =>
    state.wishlist.products.some((wProduct) => wProduct.id === product.id)
  );

  const dispatch = useDispatch();

  const selectedVariant = useMemo(
    () =>
      product.variants.find(
        (variant) =>
          variant.size.id === selectedSize.id &&
          variant.color.id === selectedColor.id
      ),
    [selectedColor.id, selectedSize.id, product.variants]
  );

  const availableVariants = useMemo(
    () =>
      product.variants.filter(
        (variant) => variant.color.id === selectedColor.id
      ),
    [selectedColor.id, product.variants]
  );

  const handleAddToCart = (variant, quantity, checkout = false) => {
    dispatch(
      addCart({
        ...product,
        variant_id: variant.id,
        color: variant.color,
        size: variant.size,
        cart_quantity: quantity,
        remain_quantity: variant.quantity,
        cover: variant.cover,
      })
    )
      .unwrap()
      .then(() => {
        if (!checkout) toast.success('Đã thêm hàng vào giỏ');
        else {
          navigate('/cart');
        }
      })
      .catch((err) => {
        toast.error(err.message);
        throw err;
      });
  };

  const handleAddToWishlist = () => {
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

  const handleRemoveFromWishlist = () => {
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
    <div {...props}>
      <div className="flex items-center justify-between">
        <h1 className="mb-3 mr-4 text-2xl font-bold">{product.name}</h1>
        <button
          className={
            'flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ' +
            (wished ? 'border-secondary-lighter' : 'border-gray-300')
          }
          onClick={() => {
            if (wished) handleRemoveFromWishlist();
            else handleAddToWishlist();
          }}
        >
          {wished ? (
            <AiFillHeart className="text-secondary" />
          ) : (
            <AiOutlineHeart className="text-gray-500" />
          )}
        </button>
      </div>
      <div className="flex items-center mb-3 text-base">
        <div className="mr-8">
          {'Mã: '}
          {selectedVariant?.sku}
        </div>
        <div className="flex">
          <div className="flex items-center mb-0.5 mr-2">
            {Array(parseInt(product.rating_avg))
              .fill()
              .map((_, index) => (
                <BsStarFill className=" text-secondary" key={index} />
              ))}
            {!Number.isSafeInteger(product.rating_avg) && (
              <BsStarHalf className=" text-secondary" />
            )}
            {Array(parseInt(5 - product.rating_avg))
              .fill()
              .map((_, index) => (
                <BsStar className=" text-secondary" key={index} />
              ))}
          </div>
          <div>({product.reviews_count + ' nhận xét'})</div>
        </div>
      </div>
      <div className="flex items-end">
        <div className="mr-4 text-2xl font-semibold text-secondary">
          {currencyFormat(product.sale_price || product.price) + 'đ'}
        </div>
        {!!product.sale_price && (
          <div className="text-xl text-gray-500 line-through">
            {currencyFormat(product.price) + 'đ'}
          </div>
        )}
      </div>

      <div className="border-b-[1px] border-gray-200 my-4"> </div>

      <ColorPick
        onSelectedColorChange={(color) => {
          setSelectedColor(color);
          onPreviewImageChange(color.cover);
        }}
        selectedColor={selectedColor}
        colors={product.options.colors}
      />

      <SizePick
        onSelectedSizeChange={(size) => setSelectedSize(size)}
        selectedSize={selectedSize}
        sizes={availableVariants.map((variant) => ({
          ...variant.size,
          available: variant.quantity > 0,
        }))}
      />

      <div className="flex items-center mb-8">
        <div className="mr-5">Số lượng: </div>
        <div className="inline-flex mr-5 text-xl rounded-md bg-gray-50">
          <button
            type="button"
            className="pt-1 rounded-md w-9 h-9"
            onClick={() => {
              updateQuantity({
                type: 'dec',
                payload: { max: selectedVariant.quantity },
              });
            }}
          >
            -
          </button>
          <input
            type="text"
            className="w-8 pt-1 text-base text-center bg-transparent border-none outline-none"
            value={quantity}
            onChange={({ target }) => {
              updateQuantity({
                type: 'set',
                payload: { max: selectedVariant.quantity, value: target.value },
              });
            }}
          />
          <button
            type="button"
            className="pt-1 rounded-md w-9 h-9"
            onClick={() => {
              updateQuantity({
                type: 'inc',
                payload: { max: selectedVariant.quantity },
              });
            }}
          >
            +
          </button>
        </div>
        <div className="text-gray-500">
          {selectedVariant.quantity} sản phẩm có sẵn
        </div>
      </div>

      <div className="flex flex-wrap mb-8">
        <button
          type="button"
          className="px-4 py-3 mr-6 tracking-wide transition-colors rounded-md bg-secondary-lighter text-accent hover:bg-secondary-lighter/90"
          onClick={() => {
            handleAddToCart(selectedVariant, quantity, true);
          }}
        >
          Mua ngay
        </button>
        <button
          type="button"
          className="flex items-center px-4 py-3 tracking-wide transition-colors border-2 rounded-md border-accent text-accent hover:text-white hover:bg-accent"
          onClick={() => {
            handleAddToCart(selectedVariant, quantity);
          }}
        >
          <BsCartPlus className="mr-3" />
          <span>Thêm vào giỏ hàng</span>
        </button>
      </div>

      <div>
        <p className="mb-2 text-xl font-semibold">Đặc điểm sản phẩm</p>
        <ul className="text-sm">
          <li className="flex items-start mb-1">
            <div className="w-10 shrink-0 pt-0.5">
              <BiCheckDouble size="1.2rem" className="text-secondary-darker" />
            </div>
            <p className="">
              Công nghệ làm mát FREEZING tiên tiến siêu khô thoáng
            </p>
          </li>
          <li className="flex items-start mb-1">
            <div className="w-10 shrink-0 pt-0.5">
              <BiCheckDouble size="1.2rem" className="text-secondary-darker" />
            </div>
            <p className="">Kết cấu vải siêu mịn, tỉ mỉ, chắc chắn</p>
          </li>
          <li className="flex items-start mb-1">
            <div className="w-10 shrink-0 pt-0.5">
              <BiCheckDouble size="1.2rem" className="text-secondary-darker" />
            </div>
            <p className="">Trong lượng nhẹ, thoáng khí hút ẩm cực tốt</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VariantPick;
