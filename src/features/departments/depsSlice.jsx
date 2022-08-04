import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: [],
    loading: false,
    error: null
}

export const getDeps = createAsyncThunk('deps/get', async(_, thunkAPI)=>{
    try {
        const res = await fetch("http://localhost:4000/services")
        const data = await res.json()
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const postDeps = createAsyncThunk('deps/post', async({title, text, price}, thunkAPI)=>{
    try {
        const res= await fetch("http://localhost:4000/services", {
            method: "POST",
            headers: {"Content-Type": "application/json"},   
            body: JSON.stringify({title, text, price})
        })
        return res.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const departmentSlice = createSlice({
    name: 'deps',
    initialState,
    redusers: {},
    extraReducers: (builder) =>{
        builder
               .addCase(postDeps.fulfilled, (state, action)=>{
                 state.departments.push(action.payload)
                 state.error = null
                 state.loading = false
               })
               .addCase(postDeps.rejected, (state, action)=>{
                 state.error = action.payload
                 state.loading = false
               })
               .addCase(postDeps.pending, (state, action)=>{
                 state.error = null
                 state.loading = true
               })
               .addCase(getDeps.fulfilled, (state, action)=>{
                 state.departments = action.payload
                 state.error = null
                 state.loading = false
               })
               .addCase(getDeps.rejected, (state, action)=>{
                 state.error = action.payload
                 state.loading = false
               })
               .addCase(getDeps.pending, (state, action)=>{
                 state.error = null
                 state.loading = true
               })
               
    }
})
export default departmentSlice.reducer