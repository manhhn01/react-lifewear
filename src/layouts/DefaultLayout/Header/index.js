import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Logo } from '../../../components/Logo';
import { hidePopup } from '../../../reducer/popupSlice';
import CartButton from './CartButton';
import NavItem from './NavItem';
import SearchButton from './SearchButton';
import UserButton from './UserButton';
import WishlistButton from './WishlistButton';

function Header({ transparent = false }) {
  const [show, setShow] = useState(true);
  const [active, setActive] = useState(false);
  const lastScrollY = useRef(window.scrollY);

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateScrollY = () => {
        setShow(window.scrollY < lastScrollY.current);
        setActive(window.scrollY > 100);
        lastScrollY.current = window.scrollY;
      };

      window.addEventListener('scroll', updateScrollY);

      return () => {
        window.removeEventListener('scroll', updateScrollY);
      };
    }
  }, []);

  useEffect(() => {
    if (!show) dispatch(hidePopup());
  }, [dispatch, show]);

  return (
    <header
      className={`
      group flex h-24 py-5 px-10 items-center
      fixed opacity-0 ${show ? 'top-0 opacity-100' : '-top-24'} left-0 w-full text-white
      transition-all duration-500 z-30 hover:header-active border-b
      ${active || !transparent ? 'header-active' : 'border-b-transparent'}
      `}
    >
      <div className="basis-40">
        <SearchButton />
      </div>
      <nav className="flex items-center justify-center flex-1 h-full">
        <ul className="flex items-center justify-end flex-1 h-full font-semibold uppercase list-none">
          <NavItem invertColor={!transparent || active} to="/" title="Trang chủ" />
          <NavItem
            invertColor={!transparent || active}
            to="/hang-moi"
            title="Hàng mới"
          />
        </ul>

        <div className="h-full mx-4 mb-1">
          <Logo black={active || !transparent || active} />
        </div>

        <ul className="flex items-center flex-1 h-full font-semibold uppercase list-none">
          <NavItem
            invertColor={!transparent || active}
            to="/collections"
            title="Bộ sưu tập"
          />
          <NavItem to="/sale" title="Sale" highlight />
        </ul>
      </nav>
      <div className="flex justify-end -mx-3 basis-40">
        <CartButton invertColor={active || !transparent || active} />
        <WishlistButton invertColor={active || !transparent || active} />
        <UserButton invertColor={active || !transparent || active} />
      </div>
    </header>
  );
}

export default Header;
