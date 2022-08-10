import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  error: null,
  loading: false,

};


export const callRieq = createAsyncThunk(
  "message/post",
  async ({name, email, message}, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/callRieq",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, message})
      })
      const data = await res.json()

      if(data.error) {
        return thunkAPI.rejectWithValue(data.message)
      }
      return thunkAPI.fulfillWithValue(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString())
    }
  }
)


export const callRieqSlice = createSlice({
  name:"callRieq",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
builder
.addCase(callRieq.fulfilled, (state, action) => {
state.loading = false
state.error = action.payload
})
.addCase(callRieq.pending, (state, action) => {
state.loading = true
state.error = null
})
.addCase(callRieq.rejected, (state, action) => {
state.loading = false
state.error = action.payload
})
  }
})

export default  callRieqSlice.reducer