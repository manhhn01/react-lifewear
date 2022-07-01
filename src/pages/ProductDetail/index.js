import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VariantPick from '../../components/VariantPick';
import { addCart } from '../../reducer/cartSlice';
import { addWishlist, removeWishlist } from '../../reducer/wishlistSlice';
import { AuthService } from '../../services/api/auth';
import { DataService } from '../../services/data';
import { UserService } from '../../services/user';
import Gallery from './Gallery';
import './style.css';

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const isLikedReview = (id) => likedReviews.includes(id);

  const handleAddToCart = (variant, quantity) => {
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
        toast.success('Đã thêm hàng vào giỏ');
      })
      .catch((err) => {
        toast.error(err.message);
        throw err;
      });
  };

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

  useEffect(() => {
    const dataService = new DataService(true);
    dataService
      .getProduct(slug)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          navigate('/404');
        }
        console.log(error);
      });

    dataService
      .getReviews(slug)
      .then((data) => {
        setReviews(data);
        setLikedReviews(
          data.filter((review) => review.liked).map((review) => review.id)
        );
      })
      .catch((error) => console.log(error));
    return () => dataService.api.abort();
  }, [navigate, slug]);

  return loading ? (
    <div className="flex items-center justify-center h-screen -mt-24">
      <span className="text-4xl loading"></span>
    </div>
  ) : (
    <div className="mt-4">
      {/* breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="container flex px-10 mx-auto mb-4"
      >
        <ol className="flex items-center space-x-1 text-sm text-gray-500">
          <li>
            <Link
              className="block transition-colors hover:text-gray-700"
              to="/"
            >
              <span className="sr-only">Trang chủ</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li>
            <Link to={'/collections/' + product.category.parent?.slug}>
              {product.category.parent?.name}
            </Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="text-secondary">
            <Link to={'/collections/' + product.category.slug}>
              {product.category.name}
            </Link>
          </li>
        </ol>
      </nav>
      {/* /Breadcrumb */}
      {/* Detail */}
      <div className="container flex items-start px-10 mx-auto mb-10">
        <Gallery
          images={product.images}
          previewImage={previewImage}
          className="lg:w-[45%] sticky top-[calc((100vh_-_38.5rem)/2)]"
        />
        <VariantPick
          className="px-10 lg:w-[55%]"
          product={product}
          onPreviewImageChange={(color) => {
            setPreviewImage(color);
          }}
        />
      </div>
      {/* /Detail */}

      {/* Description */}
      <div className="container items-start mx-auto px-36">
        <div className="text-2xl font-semibold text-center uppercase text-secondary">
          Chi tiết sản phẩm
        </div>
        <div className="p-5">
          {/* desc content */}
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
          {/* /desc content */}
        </div>
      </div>
      {/* /Description */}
      {/* Comments */}
      <div className="mx-5 my-8 border-b"></div>
      <div className="container items-start mx-auto px-36">
        <div className="text-2xl font-semibold text-center uppercase text-secondary">
          Đánh giá sản phẩm
        </div>
        <div className="p-5">
          {reviews.map((review) => (
            <div key={review.id} className="mb-8">
              <div className="flex items-center mb-4 space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={review.author.avatar}
                  alt={review.author.full_name}
                />
                <div className="space-y-1 font-medium dark:text-white">
                  <p>
                    {review.author.full_name}{' '}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      Tham gia vào{' '}
                      {new Date(review.author.joined_at).toLocaleDateString(
                        'vi-VN'
                      )}
                    </time>
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1">
                <div className="flex items-center mb-0.5 mr-2">
                  {Array(parseInt(review.rating))
                    .fill()
                    .map((_, index) => (
                      <BsStarFill className=" text-secondary" key={index} />
                    ))}
                  {!Number.isSafeInteger(review.rating) && (
                    <BsStarHalf className=" text-secondary" />
                  )}
                  {Array(parseInt(5 - review.rating))
                    .fill()
                    .map((_, index) => (
                      <BsStar className=" text-secondary" key={index} />
                    ))}
                </div>
              </div>
              <footer className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Đánh giá vào{' '}
                  {new Date(review.created_at).toLocaleString('vi-VN')}
                </p>
              </footer>
              <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
                {review.comment}
              </p>
              {/* <Link
                to="/"
                className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Read more
              </Link> */}
              <aside>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {review.likes_count > 0 &&
                    review.likes_count + ' người cảm thấy đánh giá này hữu ích'}
                </p>
                <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                  {auth.logged && (
                    <button
                      type="button"
                      className={
                        'bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ' +
                        (isLikedReview(review.id) ? 'text-secondary' : '')
                      }
                      onClick={() => {
                        new UserService()
                          .likeReview(
                            product.id,
                            review.id,
                            !isLikedReview(review.id)
                          )
                          .then(() => {
                            if (!isLikedReview(review.id)) {
                              setLikedReviews([...likedReviews, review.id]);
                            } else {
                              setLikedReviews(
                                likedReviews.filter((id) => id !== review.id)
                              );
                            }
                          });
                      }}
                    >
                      Hữu ích
                    </button>
                  )}
                </div>
              </aside>
            </div>
          ))}
        </div>
      </div>
      {/* /Comments */}
    </div>
  );
}

export default ProductDetail;
