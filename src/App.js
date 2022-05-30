import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './routes/ScrollToTop';
import { hidePopup } from './reducer/popupSlice';
import { Toaster } from 'react-hot-toast';
import { fetchUser } from './reducer/authSlice';
import { fetchCart } from './reducer/cartSlice';
import { fetchWishlist } from './reducer/wishlistSlice';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

function App() {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    const closePopupHandle = () => {
      dispatch(hidePopup());
    };
    document.addEventListener('click', closePopupHandle);
    return () => {
      document.removeEventListener('click', closePopupHandle);
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth.status === 'idle') {
      dispatch(fetchUser());
    }
  }, [auth.status, dispatch]);

  useEffect(() => {
    if (auth.logged) {
      if (cart.status === 'idle') dispatch(fetchCart());
      if (wishlist.status === 'idle') dispatch(fetchWishlist());
    }
  }, [auth.logged, cart.status, dispatch, wishlist.status]);

  return (
    <ScrollToTop>
      <AppRoutes />
      <Toaster
        position="bottom-center"
        reverseOrder={true}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            padding: '0.8rem 1rem',
            fontSize: '1.1rem',
            borderRadius: '4px',
          },
        }}
      />
    </ScrollToTop>
  );
}
export default App;
