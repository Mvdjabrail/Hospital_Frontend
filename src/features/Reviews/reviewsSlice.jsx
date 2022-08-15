import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const getReviews = createAsyncThunk(
  "reviews/get",
  async ({ id }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/reviews/${id}`);
      return res.json();
    } catch (e) {
      thunkAPI.rejectWithValue({ error: e.message });
    }
  }
);

export const clearStorage = (token) => {
  localStorage.clear();
};

export const createReviews = createAsyncThunk(
  "reviews/add",
  async ({ id, rating, text }, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(`http://localhost:4000/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.usersReducer.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ servicesId: id, rating: rating, text: text }),
      });
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/delete",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(`http://localhost:4000/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.usersReducer.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.fulfillWithValue(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createReviews.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews.push(action.payload);
    });
    builder.addCase(createReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteReview.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload
      );
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default reviewsSlice.reducer;
