import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../services/api/auth';
import { emptyCart, updateCart } from './cartSlice';
const initialState = {
  logged: false,
  user: null,
  status: 'idle',
  message: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, provider }, thunkAPI) => {
    try {
      if (provider) {
        await new AuthService().loginWithProvider(provider);
      } else {
        await new AuthService().login({ email, password });
      }
      const user = await new AuthService().user();

      if (user)
        return thunkAPI.fulfillWithValue({
          message: 'Đăng nhập thành công',
          user,
        });
      else
        throw thunkAPI.rejectWithValue({
          message: 'Lấy thông tin người dùng không thành công',
        });
    } catch ({ message }) {
      if (message) {
        throw thunkAPI.rejectWithValue({ message });
      }
      throw thunkAPI.rejectWithValue({
        message: 'Đăng nhập không thành công',
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    await new AuthService().logout();
    thunkAPI.dispatch(emptyCart({ logout: true }));
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registerInfo, thunkAPI) => {
    try {
      await new AuthService().register(registerInfo);
      return thunkAPI.fulfillWithValue({ message: 'Đăng ký thành công' });
    } catch ({ message }) {
      throw thunkAPI.rejectWithValue({ message });
    }
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const user = await new AuthService().user();
  return { user };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    /* Login */
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.logged = true;
      state.user = action.payload.user;
      state.status = 'fulfilled';
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.logged = false;
      state.status = 'pending';
      state.message = 'Đang đăng nhập';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.logged = false;
      state.user = null;
      state.status = 'rejected';
      state.message = action.payload.message;
    });
    /* Logout */
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.logged = false;
      state.user = false;
      state.status = 'idle';
    });
    /* Register */
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = 'fulfilled';
      state.message = 'Đăng ký thành công';
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.logged = false;
      state.status = 'pending';
      state.message = 'Đang đăng nhập...';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.logged = false;
      state.status = 'rejected';
      state.message = action.payload.message;
    });
    /* Fetch user */
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.logged = true;
      state.user = action.payload.user;
      state.status = 'fulfilled';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.logged = false;
      state.user = null;
      state.state = 'failed';
    });
  },
});

export default authSlice.reducer;
