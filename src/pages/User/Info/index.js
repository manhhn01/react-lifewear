import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { HiOutlineUser } from 'react-icons/hi';
import { MdNotificationsNone } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

function Info() {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    setTitle(document.title);
  }, [location.key]);

  return (
    <div className="mt-10">
      <ul className="container flex flex-wrap justify-center px-10 mx-auto mb-4 text-lg text-center">
        <li className="text-gray-700 last:text-secondary ">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="text-gray-700 last:text-secondary before:content-['/'] before:px-2">
          <Link to={'/user/info'}>Tài khoản</Link>
        </li>
        <li className="text-2xl font-bold text-gray-700 uppercase basis-full last:text-secondary">
          <Link to={location.pathname}>{title}</Link>
        </li>
      </ul>
      <div className="container flex flex-wrap mx-auto">
        <div className="lg:w-[25%]">
          <div className="sticky px-6 py-8 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm top-36 lg:ml-10">
            <div className="flex flex-col items-center justify-center">
              <div
                className="mb-2 rounded-full w-14 h-14"
                style={{
                  backgroundImage: `url('${auth.user.avatar}')`,
                  backgroundSize: 'cover',
                }}
              ></div>

              <div className="text-lg font-medium text-center">
                {auth.user.full_name}
              </div>
            </div>
            <div className="my-4 border-b"></div>
            <ul className="flex flex-col">
              <li className="">
                <NavLink
                  to={'/user'}
                  state={{ noTrans: true }}
                  className={({ isActive }) =>
                    'flex px-10 py-2 -mx-6 text-lg transition-colors ' +
                    (isActive
                      ? 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                      : 'bg-white hover:bg-gray-50')
                  }
                  end
                >
                  <HiOutlineUser className="mt-0.5 mr-2" /> Tài khoản của tôi
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={'/user/orders'}
                  state={{ noTrans: true }}
                  className={({ isActive }) =>
                    'flex px-10 py-2 -mx-6 text-lg transition-colors ' +
                    (isActive
                      ? 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                      : 'bg-white hover:bg-gray-50')
                  }
                >
                  <AiOutlineShoppingCart className="mt-0.5 mr-2" />
                  Đơn mua
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={'/user/addresses'}
                  state={{ noTrans: true }}
                  className={({ isActive }) =>
                    'flex px-10 py-2 -mx-6 text-lg transition-colors ' +
                    (isActive
                      ? 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                      : 'bg-white hover:bg-gray-50')
                  }
                >
                  <BiMap className="mt-0.5 mr-2" />
                  Địa chỉ
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={'/user/notifications'}
                  state={{ noTrans: true }}
                  className={({ isActive }) =>
                    'flex px-10 py-2 -mx-6 text-lg transition-colors ' +
                    (isActive
                      ? 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                      : 'bg-white hover:bg-gray-50')
                  }
                >
                  <MdNotificationsNone className="mt-0.5 mr-2" />
                  Thông báo
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:w-[75%] p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Info;
