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
      await fetch(`http://localhost:4000/user/cart/${idCart}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.usersReducer.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: product }),
      });
     return {product, idCart}
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        state.cart = state.cart.map(item => {
          if (item._id === action.payload.idCart) {
            item.products.push(action.payload.product)
            return item
          }
          return item
        })
        state.error = null;
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
