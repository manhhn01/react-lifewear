import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="mt-10">
      <div className="border-t-[1px] mx-5"></div>
      <div className="container pt-10 pb-0 mx-auto">
        <h4 className="mb-2 text-2xl font-semibold text-center uppercase text-secondary">
          Đăng ký nhận thông tin
        </h4>
        <p className="mb-2 text-center text-gray-400">
          Nhận cập nhật liên tực về các sản phẩm yêu thích của bạn
        </p>
        <div className="flex w-4/5 mx-auto lg:w-3/5">
          <input
            type="text"
            className="flex-1 text-lg leading-8 transition-all duration-300 bg-transparent border-b-2 outline-none border-b-gray-400 focus:border-b-black"
            placeholder="Nhập email đăng ký của bạn"
          />
          <button
            type="button"
            className="px-2 ml-4 text-lg uppercase transition-all duration-300 border-b-2 border-b-gray-400 hover:border-b-black"
          >
            Đăng ký
          </button>
        </div>
      </div>
      <div className="container flex flex-wrap px-10 py-10 mx-auto">
        <div className="px-6 lg:w-1/2">
          <h3 className="mb-2 text-xl uppercase">Liên hệ đặt hàng</h3>
          <p className="mb-2 text-3xl">1900 1009</p>
          <p className="text-xs text-gray-400">
            Các ngày trong tuần trừ nghỉ lễ
          </p>
          <h4 className="mt-4 mb-2 text-xl uppercase">Góp ý khiếu nại</h4>
          <p className="mb-2 text-3xl">1900 1009</p>
          <p className="text-xs text-gray-400">
            Các ngày trong tuần trừ nghỉ lễ
          </p>
        </div>
        <div className="px-6 lg:w-1/2">
          <h4 className="mb-2 text-xl uppercase">Hệ thống cửa hàng</h4>
          <div className="h-44">
            <img
              className="object-cover w-full h-full"
              src="//file.hstatic.net/1000003969/file/showroom-duoi-700x330_905a99aac7a64b0a892b7dbe67e56de8.jpg"
              alt="cua hang"
            />
          </div>
        </div>
      </div>
      <div className="p-10 text-black bg-slate-100">
        <div className="container flex flex-wrap mx-auto">
          <div className="w-full px-6 lg:w-1/5">
            <p className="mb-4">
              “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
              hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn
              cùng Lifewear tiến bước
            </p>
          </div>
          <div className="w-1/2 px-6 lg:w-1/5">
            <h4 className="mb-3 text-lg uppercase text-secondary">
              Về Lifewear
            </h4>
            <ul className="mb-4">
              <li className="mb-1">
                <a href="/">Giới thiệu</a>
              </li>
              <li className="mb-1">
                <a href="/">Liên hệ</a>
              </li>
              <li className="mb-1">
                <a href="/">Tuyển dụng</a>
              </li>
              <li className="mb-1">
                <a href="/">Tin tức</a>
              </li>
            </ul>
          </div>
          <div className="w-1/2 px-6 lg:w-1/5">
            <h4 className="mb-3 text-lg uppercase text-secondary">
              Hỗ trợ khách hàng
            </h4>
            <ul className="mb-4">
              <li className="mb-1">
                <a href="/">Hướng dẫn chọn size</a>
              </li>
              <li className="mb-1">
                <a href="/">Khách hàng thân thiết</a>
              </li>
              <li className="mb-1">
                <a href="/">Chính sách đổi trả</a>
              </li>
              <li className="mb-1">
                <a href="/">Chính sách bảo mật</a>
              </li>
            </ul>
          </div>
          <div className="w-full px-6 lg:w-2/5">
            <ul className="mt-3 text-lg">
              <li className="flex items-center mb-1">
                <div className="mr-5">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="uppercase text-secondary">
                    Công ty cổ phần Lifewear Fashion Group.
                  </p>
                  <p>
                    Số 298 Đ. Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội, Việt Nam
                  </p>
                </div>
              </li>
              ...
              {/* todo */}
            </ul>
          </div>
        </div>
      </div>
      <div className="container px-10 py-3 mx-auto">
        <div>
          <span className="text-gray-700">&copy; Bản quyền thuộc về</span>
          <a href="/" className="text-secondary/95">
            {' Lifewear.com'}
          </a>
          <span className="text-gray-700">{' All right reserved'}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
