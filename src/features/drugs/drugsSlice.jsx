import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  drugs: [],
  drug: false,
  loading: false,
  showDrugs: false,
  error: null,
};

export const getDrugs = createAsyncThunk("drugs/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/drug");
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addDrugs = createAsyncThunk(
  "drug/add",
  async (payload, thunkAPI) => {
    try {
      const drug = new FormData();

      drug.append("title", payload.title);
      drug.append("text", payload.discription);
      drug.append("price", payload.price);
      drug.append("category", payload.categor);
      drug.append("image", payload.photo);
      drug.append("recept", payload.recept);

      const res = await fetch("http://localhost:4000/drug", {
        method: "POST",
        body: drug,
      });

      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteDrugs = createAsyncThunk(
  "drug/delete",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(`http://localhost:4000/drug/:${state.drugs.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const drugsSlice = createSlice({
  name: "drugs",
  initialState,
  reducers: {
    showModalDrugs: (state, action) => {
      state.showDrugs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDrugs.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDrugs.fulfilled, (state, action) => {
      state.drugs = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getDrugs.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(addDrugs.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addDrugs.fulfilled, (state, action) => {
      state.drugs.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addDrugs.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(deleteDrugs.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteDrugs.fulfilled, (state, action) => {
      state.drugs = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteDrugs.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { showModalDrugs, errorNull } = drugsSlice.actions;

export default drugsSlice.reducer;
