import React from 'react';
import toast from 'react-hot-toast';
import { AiOutlineUser } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { GrDeliver } from 'react-icons/gr';
import { HiOutlineUser } from 'react-icons/hi';
import { MdNotificationsNone, MdOutlineLock } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DropDown from '../../../../components/DropDown';
import { logoutUser } from '../../../../reducer/authSlice';
import { togglePopup } from '../../../../reducer/popupSlice';

function UserButton() {
  const popup = useSelector((state) => state.popup);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <button
        type="button"
        className="p-3"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(togglePopup('userPopup'));
        }}
      >
        <AiOutlineUser size="1.2rem" />
      </button>
      <DropDown show={popup === 'userPopup'} position="l">
        <ul className="flex flex-col text-left">
          {auth.logged ? (
            <>
              <li>
                <div className="flex items-center px-10 py-4">
                  <div className="w-8 h-8 mr-2 overflow-hidden rounded-full">
                    <img
                      className="object-cover w-full h-full"
                      src={auth.user?.avatar}
                      alt={auth.user?.full_name}
                    />
                  </div>
                  <span>{auth.user.full_name}</span>
                </div>
              </li>
              <li className="w-[calc(100%_-_1.5rem)] border-b mx-auto mb-2"></li>
              <li>
                <Link
                  className="flex items-center px-6 py-2 hover:bg-gray-100"
                  to="/user/notifications"
                >
                  <MdNotificationsNone size="1.1rem" className="mr-2" />
                  <span className="pt-1">Th??ng b??o</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center px-6 py-2 hover:bg-gray-100"
                  to="/user"
                >
                  <HiOutlineUser size="1.1rem" className="mr-2" />
                  <span className="pt-1">T??i kho???n c???a t??i</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center px-6 py-2 hover:bg-gray-100"
                  to="/user/orders"
                >
                  <GrDeliver size="1.1rem" className="mr-2" />{' '}
                  <span className="pt-1">????n mua</span>
                </Link>
              </li>
              <li>
                <div
                  className="flex items-center w-full px-6 py-2 hover:bg-gray-100 hover:cursor-pointer"
                  onClick={() => {
                    toast.promise(dispatch(logoutUser()).unwrap(), {
                      loading: '??ang ????ng xu???t...',
                      success: '????ng xu???t th??nh c??ng',
                      error: ({ message }) => message,
                    });
                  }}
                >
                  <FiLogOut size="1.1rem" className="mr-2" />
                  <span className="pt-1">????ng xu???t</span>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="flex items-center px-6 py-2 hover:bg-gray-100"
                  to="/user/login"
                >
                  <MdOutlineLock size="1.1rem" className="mr-2" />
                  <span className="pt-1">????ng nh???p</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center px-6 py-2 hover:bg-gray-100"
                  to="/user/register"
                >
                  <HiOutlineUser size="1.1rem" className="mr-2" />
                  <span className="pt-1">????ng k??</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </DropDown>
    </div>
  );
}

export default UserButton;
