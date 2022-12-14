import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   appointments: [],
   loading: false,
   error: null,
   token: localStorage.getItem('token'),
   showModal: false,
   playChat: [],
}

export const fetchAppointments = createAsyncThunk("appointments/fetch", async (_, thunkAPI) => {
   try {
      const state = thunkAPI.getState();
      const res = await fetch("http://localhost:4000/appointments/fetch",
         {
            method: "GET",
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${state.usersReducer.token}`,
            },
         }
      );
      const appointment = await res.json();

      if (appointment.error) {
         return thunkAPI.rejectWithValue(appointment.error);
      }
      else {
         return thunkAPI.fulfillWithValue(appointment);
      }
   } catch (err) {
      return thunkAPI.rejectWithValue(err);
   }
});

export const addAppointment = createAsyncThunk("appointments/add", async ({ doctorId, user, service, roomId },
   thunkAPI) => {
   try {
      const state = thunkAPI.getState();
      const res = await fetch("http://localhost:4000/appointments/add",
         {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${state.usersReducer.token}`,
            },
            body: JSON.stringify({ doctorId, user, service, roomId })
         }
      );
      const appointment = await res.json();

      if (appointment.error) {
         return thunkAPI.rejectWithValue(appointment.error);
      }
      else {
         return thunkAPI.fulfillWithValue(appointment);
      }
   } catch (err) {
      return thunkAPI.rejectWithValue(err);
   }
});

export const updateAppointment = createAsyncThunk("appointments/update", async ({ id, dateAndTime }, thunkAPI) => {
   try {
      const state = thunkAPI.getState();
      const res = await fetch(`http://localhost:4000/appointments/update/${id}`,
         {
            method: "PATCH",
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${state.usersReducer.token}`,
            },
            body: JSON.stringify({ dateAndTime })
         }
      );
      const appointment = await res.json();

      if (appointment.error) {
         return thunkAPI.rejectWithValue(appointment.error);
      }
      else {
         return thunkAPI.fulfillWithValue(appointment);
      }
   } catch (err) {
      return thunkAPI.rejectWithValue(err);
   }
});

export const deleteAppointment = createAsyncThunk("appointments/delete", async (id, thunkAPI) => {
   try {
      const state = thunkAPI.getState();
      const res = await fetch(`http://localhost:4000/appointments/delete/${id}`,
         {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${state.usersReducer.token}`,
            },
         }
      );
      const appointment = await res.json();

      if (appointment.error) {
         return thunkAPI.rejectWithValue(appointment.error);
      }
      else {
         return thunkAPI.fulfillWithValue(id);
      }
   } catch (err) {
      return thunkAPI.rejectWithValue(err);
   }
});


export const appointmentsSlice = createSlice({
   name: "appointments",
   initialState,
   reducers:  {
      playChatReducer: (state, action) => {
         state.playChat.push(action.payload);
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.loading = false;
            state.error = null;
         })
         .addCase(fetchAppointments.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(fetchAppointments.rejected, (state, action) => {
            state.error = action.payload;
            state.signUp = false;
         })
         .addCase(addAppointment.fulfilled, (state, action) => {
            state.appointments.push(action.payload);
            state.loading = false;
            state.showModal = false;
            state.error = null;
         })
         .addCase(addAppointment.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(addAppointment.rejected, (state, action) => {
            state.error = action.payload;
            state.signUp = false;
         })
         .addCase(updateAppointment.fulfilled, (state, action) => {
            state.appointments = state.appointments.map((item) => {
               if (item._id === action.payload._id) {
                  return action.payload;
               }
               return item;
            })
            state.loading = false;
            state.error = null;
         })
         .addCase(updateAppointment.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(updateAppointment.rejected, (state, action) => {
            state.error = action.payload;
            state.signUp = false;
         })
         .addCase(deleteAppointment.fulfilled, (state, action) => {
            state.appointments = state.appointments.filter((appoint) => appoint._id !== action.payload)
            state.loading = false;
            state.error = null;
         })
         .addCase(deleteAppointment.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(deleteAppointment.rejected, (state, action) => {
            state.error = action.payload;
            state.signUp = false;
         })
   }
});

export const { playChatReducer } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;