import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartService } from '../services/cart';

const cartProducts = JSON.parse(localStorage.getItem('cart'));
const initialState = {
  products: cartProducts || [],
  type: 'local',
  status: 'idle',
};

export const addCart = createAsyncThunk(
  'cart/addCart',
  async (product, thunkAPI) => {
    const existProduct = thunkAPI
      .getState()
      .cart.products.find(
        (cartProduct) => product.variant_id === cartProduct.variant_id
      );

    if (!existProduct) {
      if (thunkAPI.getState().auth.logged) {
        try {
          const products = await new CartService().addCart(product);
          return thunkAPI.fulfillWithValue({
            type: 'server',
            products,
          });
        } catch ({ message }) {
          if (message) throw thunkAPI.rejectWithValue({ message });
          else
            throw thunkAPI.rejectWithValue({
              message: 'Có lỗi khi thêm sản phẩm vào giỏ hàng',
            });
        }
      } else {
        return thunkAPI.fulfillWithValue({
          type: 'local',
          product,
        });
      }
    } else {
      try {
        await thunkAPI
          .dispatch(
            updateCartQuantity({
              product,
              cart_quantity:
                parseInt(existProduct.cart_quantity) +
                parseInt(product.cart_quantity),
            })
          )
          .unwrap();
        return thunkAPI.fulfillWithValue({ type: 'other' });
      } catch ({ message }) {
        if (message) throw thunkAPI.rejectWithValue({ message });
        else
          throw thunkAPI.rejectWithValue({
            message: 'Có lỗi khi thêm sản phẩm vào giỏ hàng',
          });
      }
    }
  }
);

export const removeCart = createAsyncThunk(
  'cart/removeCart',
  async ({ product }, thunkAPI) => {
    if (thunkAPI.getState().auth.logged) {
      try {
        const products = await new CartService().removeProduct(
          product.variant_id
        );
        return thunkAPI.fulfillWithValue({
          type: 'server',
          products,
        });
      } catch ({ message }) {
        if (message) throw thunkAPI.rejectWithValue({ message });
        else
          throw thunkAPI.rejectWithValue({
            message: 'Có lỗi khi xóa sản phẩm khỏi giỏ hàng',
          });
      }
    } else {
      console.log(product);
      return thunkAPI.fulfillWithValue({
        type: 'local',
        product,
      });
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ product, cart_quantity }, thunkAPI) => {
    if (thunkAPI.getState().auth.logged) {
      try {
        const products = await new CartService().updateQuantity(
          product,
          cart_quantity > product.quantity
            ? product.quantity
            : cart_quantity <= 0
            ? 1
            : cart_quantity
        );
        return thunkAPI.fulfillWithValue({ type: 'server', products });
      } catch ({ message }) {
        if (message) throw thunkAPI.rejectWithValue({ message });
        else
          throw thunkAPI.rejectWithValue({
            message: 'Có lỗi khi cập nhật số lượng trong giỏ hàng',
          });
      }
    } else {
      return thunkAPI.fulfillWithValue({
        type: 'local',
        new_quantity: cart_quantity,
        product,
      });
    }
  }
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ products: newProducts }, thunkAPI) => {
    if (thunkAPI.getState().auth.logged) {
      try {
        const products = await new CartService().updateCart(newProducts);
        return thunkAPI.fulfillWithValue({ type: 'server', products });
      } catch ({ message }) {
        if (message) throw thunkAPI.rejectWithValue({ message });
        else
          throw thunkAPI.rejectWithValue({
            message: 'Có lỗi khi cập nhật giỏ hàng',
          });
      }
    } else {
      return thunkAPI.fulfillWithValue({ products: newProducts });
    }
  }
);

export const emptyCart = createAsyncThunk(
  'cart/empty',
  async ({ logout = false }, thunkAPI) => {
    if (logout) return thunkAPI.fulfillWithValue({ logout });
    else thunkAPI.dispatch(updateCart({ products: [] }));
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    if (thunkAPI.getState().auth.logged) {
      const products = await new CartService().fetchCart();
      return thunkAPI.fulfillWithValue({ products });
    } else {
      throw new Error('Not Authenticated');
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    /* Fetch cart */
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.status = 'fulfilled';
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = 'rejected';
    });
    /* Add cart */
    builder.addCase(addCart.fulfilled, (state, action) => {
      if (action.payload.type === 'local') {
        state.products.push(action.payload.product);
        state.status = 'fulfilled';
        state.type = 'local';
        localStorage.setItem('cart', JSON.stringify(state.products));
      } else if (action.payload.type === 'server') {
        state.products = action.payload.products;
        state.status = 'fulfilled';
        state.type = 'server';
      }
    });
    builder.addCase(addCart.rejected, (state, action) => {
      state.status = 'rejected';
    });
    /* Update cart */
    builder.addCase(updateCart.fulfilled, (state, action) => {
      if (action.payload.type === 'local') {
        state.products.push(action.payload.product);
        state.status = 'fulfilled';
        state.type = 'local';
        localStorage.setItem('cart', JSON.stringify(state.products));
      } else if (action.payload.type === 'server') {
        state.products = action.payload.products;
        state.status = 'fulfilled';
        state.type = 'server';
      }
    });
    /* Update cart quantity */
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      if (action.payload.type === 'local') {
        state.products = state.products.map((product) => {
          if (product.variant_id === action.payload.product.variant_id) {
            product.cart_quantity =
              action.payload.new_quantity > product.remain_quantity
                ? product.remain_quantity
                : action.payload.new_quantity <= 0
                ? 1
                : action.payload.new_quantity;
          }
          return product;
        });
        state.status = 'fulfilled';
        state.type = 'local';
        localStorage.setItem('cart', JSON.stringify(state.products));
      } else if (action.payload.type === 'server') {
        state.products = action.payload.products;
        state.status = 'fulfilled';
        state.type = 'server';
      }
    });
    builder.addCase(updateCartQuantity.rejected, (state, action) => {
      state.status = 'rejected';
    });
    /* Delete cart */
    builder.addCase(removeCart.fulfilled, (state, action) => {
      if (action.payload.type === 'local') {
        state.products = state.products.filter(
          (product) => product.variant_id !== action.payload.product.variant_id
        );
        state.status = 'fulfilled';
        state.type = 'local';
        localStorage.setItem('cart', JSON.stringify(state.products));
      } else if (action.payload.type === 'server') {
        state.products = action.payload.products;
        state.status = 'fulfilled';
        state.type = 'server';
      }
    });
    builder.addCase(emptyCart.fulfilled, (state, action) => {
      if (action.payload.logout) {
        state.status = 'idle';
        state.products = JSON.parse(localStorage.getItem('cart'));
      }
    });
    builder.addCase(removeCart.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export default cartSlice.reducer;
