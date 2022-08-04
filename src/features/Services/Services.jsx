import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  showService: false,
  showDrugs: false,
  services:[]
};

export const postService = createAsyncThunk(
  "services/post",
  async ({ text, title, image }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/services", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text, title, image }),
      });
      const data = await res.json;
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

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers:{
    showModalServices: (state, action) => {
        state.showService = action.payload
    },
    showModalDrugs: (state, action) => {
        state.showDrugs = action.payload
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(postService.fulfilled, (state, action)=>{
        state.services.push(action.payload)
        state.showDrugs = false
    })
  }
});

export const {showModalDrugs, showModalServices}=
serviceSlice.actions;

export default serviceSlice.reducer
