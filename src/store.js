import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authSlice';
import popupReducer from './reducer/popupSlice';
import cartReducer from './reducer/cartSlice';
import wishlistReducer from './reducer/wishlistSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
