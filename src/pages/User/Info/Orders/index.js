import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pill from '../../../../components/Pill';
import useTitle from '../../../../hooks/useTitle';
import { UserService } from '../../../../services/user';
import { currencyFormat } from '../../../../utils';

function Orders() {
  useTitle('Đơn hàng');
  const [searchParams, setSearchParams] = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (newPage) => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams, { state: { noScroll: true } });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Đang xử lý';
      case 1:
        return 'Đang vận chuyển';
      case 2:
        return 'Giao thành công';
      case 3:
        return 'Đã hủy';
      default:
        return '';
    }
  };

  useEffect(() => {
    const user = new UserService();
    user.getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
    return () => {
      user.api.abort();
    };
  }, []);
  return loading ? (
    <div className="flex items-center justify-center py-10">
      <div className="text-4xl loading"></div>
    </div>
  ) : orders.data.length === 0 ? (
    <div className="my-10 text-center">Không có đơn hàng nào.</div>
  ) : (
    <div>
      <ul>
        <div className="flex px-4 py-3 mb-4 font-semibold uppercase border-t border-b border-slate-200 bg-slate-50">
          <div className="w-1/12 text-center">Mã đơn</div>
          <div className="w-1/5 text-center">Ngày đặt hàng</div>
          <div className="flex-1 text-center">Địa chỉ giao hàng</div>
          <div className="w-1/5 text-center">Tổng đơn hàng</div>
          <div className="w-1/5 text-center">Trạng thái</div>
        </div>
        {orders.data.map((order, index) => (
          <li key={order.id} className="flex items-center px-4 py-3">
            <div className="w-1/12 font-bold text-center">#{order.id}</div>
            <div className="w-1/5 text-center">
              {new Date(order.created_at).toLocaleString('vi-VN')}
            </div>
            <div className="flex-1 text-center">{order.shipping_address}</div>
            <div className="w-1/5 text-center ">
              {currencyFormat(order.total_price) + 'đ'}
            </div>
            <div className="w-1/5 text-center">
              <Pill type={order.status} title={getStatusText(order.status)} />
            </div>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <ol className="flex justify-center mt-5 space-x-1 text-xs font-medium">
        <li>
          <button
            type="button"
            onClick={() =>
              handleChangePage(parseInt(searchParams.get('page') - 1))
            }
            disabled={searchParams.get('page') <= 1}
            className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded disabled:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        {Array(orders.last_page)
          .fill()
          .map((_, index) => (
            <li key={index}>
              <button
                className={
                  'block w-8 h-8 leading-8 text-center border-2 rounded ' +
                  (index + 1 === parseInt(searchParams.get('page') || 1)
                    ? 'border-secondary text-secondary'
                    : 'border-gray-100')
                }
                onClick={() => handleChangePage(index + 1)}
                key={index}
              >
                {index + 1}
              </button>
            </li>
          ))}
        <li>
          <button
            type="button"
            onClick={() =>
              handleChangePage(parseInt(searchParams.get('page')) + 1)
            }
            className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded disabled:text-gray-200"
            disabled={searchParams.get('page') || 1 >= orders.last_page}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ol>
      {/* /Pagination */}
    </div>
  );
}

export default Orders;
