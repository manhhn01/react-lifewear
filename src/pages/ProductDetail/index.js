import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import VariantPick from '../../components/VariantPick';
import { addCart } from '../../reducer/cartSlice';
import { addWishlist, removeWishlist } from '../../reducer/wishlistSlice';
import { DataService } from '../../services/data';
import Gallery from './Gallery';
import './style.css';

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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
    new DataService(true)
      .getProduct(slug)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

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
            <a className="block transition-colors hover:text-gray-700" href="/">
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
            </a>
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
          <li className='text-secondary'>
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
        <div>
          {/* desc content */}
          {/* <div className="ba-text-fpt">
            <p>
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<!--td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}-->\n',
                }}
              />
            </p>
            <h2 style={{ textAlign: 'center' }}>
              CHẤT LIỆU AIRY COOL - CÔNG NGHỆ VẢI THẾ HỆ MỚI
              <meta charSet="utf-8" />
            </h2>
            <p dir="ltr" style={{ textAlign: 'center' }}>
              <em>
                Thấu hiểu mong muốn sử dụng những sản phẩm thời trang thoáng
                mát, thấm hút tốt cho mùa hè, đội ngũ YODY nghiên cứu và cho rời
                đời sản phẩm áo polo Airy Cool với những tính năng vượt
                trội.&nbsp;
              </em>
            </p>
            <p dir="ltr" style={{ textAlign: 'center' }}>
              Công nghệ vải FREEZING tiên tiến, hạ nhiệt cho ngày hè.
            </p>
            <p style={{ textAlign: 'center' }}>
              <img
                alt="Chất liệu áo polo Airy Cool"
                data-thumb="original"
                original-height={1704}
                original-width={2234}
                src="//bizweb.sapocdn.net/100/438/408/files/chat-lieu-airycool-min-cd9335f9-803d-4921-b6e7-823a1b4c3b52.jpg?v=1646793959050"
                style={{ width: '1000px', height: '763px' }}
              />
            </p>
            <p dir="ltr" style={{ textAlign: 'center' }}>
              <em>Công nghệ làm mát Freezing - hạ nhiệt cho mùa hè</em>
            </p>
            <h2 dir="ltr">Công nghệ hạ nhiệt đỉnh cao&nbsp;</h2>
            <p dir="ltr">
              Sản phẩm được thiết kế với 85% Polyamide và 15% spandex. Trong đó,
              sợi Polyamide là cấu tạo chính giúp tạo cảm giác thoải mái, dễ
              chịu khi mặc. Kết hợp với 15% spandex giúp sợi vải thêm bền chắc,
              tạo form dáng thời trang.&nbsp;
            </p>
            <p dir="ltr">
              Công nghệ làm mát Freezing giúp tạo lá chắn bảo vệ cơ thể khỏi môi
              trường bên ngoài. Thiết kế áo giúp tăng tiêu tán bức xạ nhiệt và
              hạn chế tối đa hấp thụ nhiệt vào cơ thể. Áo polo như một cơ chế
              làm mát tự nhiên, cho người mặc cảm giác thoải mái, mọi lúc, mọi
              nơi, và trong mọi hoạt động.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              <img
                alt="Áo thể thao Airy Cool"
                data-thumb="original"
                original-height={1704}
                original-width={2246}
                src="//bizweb.sapocdn.net/100/438/408/files/frame-10000058632.jpg?v=1646897671279"
                style={{ width: '1000px', height: '759px' }}
              />
            </p>
            <p style={{ textAlign: 'center' }}>
              <em>
                Giảm tối đa bức xạ nhiệt trên áo, giảm cảm giác bí nóng, khó
                chịu&nbsp;
              </em>
            </p>
            <p dir="ltr">
              Sản phẩm áo Polo YODY Airy Cool mang đến những tính năng vượt trội
              cho người dùng. Cảm nhận sử dụng thoải mái, chất liệu vải khô
              nhanh, mềm mịn. Cảm nhận sử dụng thông thoáng, thấm hút tốt. Sản
              phẩm giữ form dáng thời trang, có thể kết hợp với nhiều kiểu trang
              phục hiện đại, trẻ trung, năng động.&nbsp;
            </p>
            <p style={{ textAlign: 'center' }}>
              <img
                alt="Áo Polo Airy Cool thấm hút mồ hôi "
                data-thumb="original"
                original-height={1642}
                original-width={2234}
                src="//bizweb.sapocdn.net/100/438/408/files/chat-lieu-ao-polo-airycool.jpg?v=1646757391789"
                style={{ width: '1000px', height: '735px' }}
              />
            </p>
            <p dir="ltr" style={{ textAlign: 'center' }}>
              <em>Cảm nhận mát lạnh, thấm hút mồ hôi nhanh chóng</em>
            </p>
            <p dir="ltr" style={{ textAlign: 'center' }}>
              <em>&nbsp;</em>
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder={0}
                height={315}
                src="https://www.youtube.com/embed/d9e4ACsUG0c"
                title="YouTube video player"
                width={560}
              />
            </p>
            <h2 dir="ltr">Thông tin bảo quản</h2>
            <ul>
              <li aria-level={1} dir="ltr">
                <p dir="ltr" role="presentation">
                  Lộn trái sản phẩm khi giặt, giặt với sản phẩm cùng màu ở nhiệt
                  độ dưới 30 độ C
                </p>
              </li>
              <li aria-level={1} dir="ltr">
                <p dir="ltr" role="presentation">
                  Là ở nhiệt độ dưới 110 độ C
                </p>
              </li>
              <li aria-level={1} dir="ltr">
                <p dir="ltr" role="presentation">
                  Sử dụng xà phòng trung tính, không giặt cùng các sản phẩm có
                  bề mặt sắc nhọn&nbsp;
                </p>
              </li>
              <li aria-level={1} dir="ltr">
                <p dir="ltr" role="presentation">
                  Không sử dụng chất tẩy, không ngâm sản phẩm&nbsp;
                </p>
              </li>
              <li aria-level={1} dir="ltr">
                <p dir="ltr" role="presentation">
                  Phơi ngang bằng móc
                </p>
              </li>
              <li aria-level={1} dir="ltr">
                <p dir="ltr" role="presentation">
                  Bảo quản nơi khô ráo, thoáng mát
                </p>
              </li>
            </ul>
            <p dir="ltr" role="presentation" style={{ textAlign: 'center' }}>
              <strong>
                ĐI TẬP, ĐI CHƠI HAY ĐƠN GIẢN TÌM KIẾM MỘT SỰ THOẢI MÁI MÁT MẺ
                CHO MÙA HÈ, SỞ HỮU NGAY CHIẾC ÁO POLO NÀY!
              </strong>
            </p>
          </div> */}
          {/* /desc content */}
        </div>
      </div>
      {/* /Description */}
    </div>
  );
}

export default ProductDetail;
