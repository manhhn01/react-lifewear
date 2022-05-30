import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WishlistService } from '../services/wishlist';

const initialState = {
  products: [],
  status: 'idle',
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, thunkAPI) => {
    if (thunkAPI.getState().auth.logged) {
      try {
        const products = await new WishlistService().fetchWishlist();
        return thunkAPI.fulfillWithValue({ products });
      } catch ({ message }) {
        if (message) throw thunkAPI.rejectWithValue({ message });
        else
          throw thunkAPI.rejectWithValue({
            message: 'Không thể lấy danh sách sản phẩm yêu thích',
          });
      }
    }
  }
);
export const addWishlist = createAsyncThunk(
  'wishlist/addWishlist',
  async ({ product }, thunkAPI) => {
    if (thunkAPI.getState().auth.logged) {
      try {
        const products = await new WishlistService().addWishlist(product);
        return thunkAPI.fulfillWithValue({ products });
      } catch ({ message }) {
        if (message) throw thunkAPI.rejectWithValue({ message });
        else
          throw thunkAPI.rejectWithValue({
            message: 'Có lỗi khi thêm sản phẩm yêu thích',
          });
      }
    } else {
      throw thunkAPI.rejectWithValue({
        message: 'Bạn cần đăng nhập để sử dụng tính năng này',
      });
    }
  }
);
export const removeWishlist = createAsyncThunk(
  'wishlist/removeWishlist',
  async ({ product }, thunkAPI) => {
    if (thunkAPI.getState().auth.logged) {
      try {
        const products = await new WishlistService().removeWishlist(product.id);
        return thunkAPI.fulfillWithValue({ products });
      } catch ({ message }) {
        if (message) throw thunkAPI.rejectWithValue({ message });
        else
          throw thunkAPI.rejectWithValue({
            message: 'Có lỗi khi xóa sản phẩm yêu thích',
          });
      }
    } else {
      throw thunkAPI.rejectWithValue({
        message: 'Bạn cần đăng nhập để sử dụng tính năng này',
      });
    }
  }
);
export const updateWishlist = createAsyncThunk(
  'wishlist/updateWishlist',
  async ({ products }, thunkAPI) => {
    if (thunkAPI.getState().auth.logged) {
      try {
        const returnProducts = await new WishlistService().updateWishlist(
          products
        );
        return thunkAPI.fulfillWithValue({ returnProducts });
      } catch ({ message }) {
        if (message) throw thunkAPI.rejectWithValue({ message });
        else
          throw thunkAPI.rejectWithValue({
            message: 'Có lỗi cập sản phẩm yêu thích',
          });
      }
    } else {
      throw thunkAPI.rejectWithValue({
        message: 'Bạn cần đăng nhập để sử dụng tính năng này',
      });
    }
  }
);

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.status = 'fulfilled';
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.status = 'rejected';
    });
    builder.addCase(addWishlist.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.status = 'fulfilled';
    });
    builder.addCase(addWishlist.rejected, (state, action) => {
      state.status = 'rejected';
    });
    builder.addCase(removeWishlist.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.status = 'fulfilled';
    });
    builder.addCase(removeWishlist.rejected, (state, action) => {
      state.status = 'rejected';
    });
    builder.addCase(updateWishlist.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.status = 'fulfilled';
    });
    builder.addCase(updateWishlist.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export default wishlistSlice.reducer;
