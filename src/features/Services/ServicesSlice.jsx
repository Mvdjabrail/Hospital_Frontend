import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  servic: false,
  showService: false,
  error: null,
  services: [],
  loading: false
};

export const postService = createAsyncThunk(
  "services/post",
  async (payload, thunkAPI) => {
    try {
      const datafor = new FormData();

      datafor.append("title", payload.title);
      datafor.append("text", payload.discription);
      datafor.append("price", payload.price);
      datafor.append("image", payload.photo);
      const res = await fetch("http://localhost:4000/services", {
        method: "POST",
        body: datafor,
      });
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getService = createAsyncThunk('services/get', async(_, thunkAPI)=>{
  try {
      const res = await fetch("http://localhost:4000/services")
      const data = await res.json()
      return data
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }
})

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    showModalServices: (state, action) => {
      state.showService = action.payload;
    },
    
    errorNull: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postService.fulfilled, (state, action) => {
        state.services.push(action.payload);
        state.showDrugs = false;
        state.servic = false;
      })
      .addCase(postService.rejected, (state, action) => {
        state.error = action.payload;
        state.servic = false;
      })
      .addCase(getService.fulfilled, (state, action)=>{
        state.services = action.payload
        state.error = null
        state.loading = false
      })
      .addCase(getService.rejected, (state, action)=>{
        state.error = action.payload
        state.loading = false
      })
      .addCase(getService.pending, (state, action)=>{
        state.error = null
        state.loading = true
      })
  },
});

export const { showModalDrugs, showModalServices, errorNull } =
  serviceSlice.actions;

export default serviceSlice.reducer;
