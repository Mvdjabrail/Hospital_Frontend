import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patchUser } from "./../users/userSlice";
const initialState = {
  cart: [],
  error: null,
};

export const getCart = createAsyncThunk("cart/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/cart");
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addCart = createAsyncThunk(
  "cart/patch",
  async ({ idCart, product }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await fetch(`http://localhost:4000/user/cart/${idCart}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.usersReducer.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: { productId: product, amount: 1 } }),
      });

      const data = await res.json();
      return { product, idCart, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delProduct = createAsyncThunk(
  "del/product",
  async ({ idCart, idProduct }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await fetch(`http://localhost:4000/cart/delete/${idCart}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.usersReducer.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idProduct }),
      });
      console.log("ID", idProduct);
      const cart = await res.json();
      return cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const minusCartIem = createAsyncThunk(
  "minus/plus",
  async ({ idCart, id }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/minus/cart/${idCart}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const cart = await res.json();

      return cart;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const plusCartIem = createAsyncThunk(
  "cart/plus",
  async ({ idCart, id }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/plus/cart/${idCart}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const cart = await res.json();

      return cart;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCart.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload.idCart) {
            return action.payload.data;
          }
          return item;
        });
        state.error = null;
      })
      .addCase(plusCartIem.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(minusCartIem.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(delProduct.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(patchUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
