import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUp: false,
  signIn: false,
  showSignIn: false,
  showSignUp: false,
  error: null,
  key: "",
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  user: localStorage.getItem("user"),
  userId: localStorage.getItem("userId"),
  users: [],
};

export const getUsers = createAsyncThunk("users/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/user");
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addUser = createAsyncThunk(
  "user/add",
  async ({email, firstName, lastName, login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, firstName, lastName, login, password }),
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

export const auth = createAsyncThunk(
  "login",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", data.user);
        localStorage.setItem("userId", data.userId);
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getKey = createAsyncThunk("email", async (email, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }

    return thunkAPI.fulfillWithValue(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.toString());
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ firstName, lastName, email, login, password, role }, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(
        `http://localhost:4000/user/update/:${state.usersReducer.id}`,
        {
          method: "UPDATE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.usersReducer.token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            login,
            password,
            role,
          }),
        }
      );
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        localStorage.setItem("token", data.token);
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(
        `http://localhost:4000/user/delete/:${state.usersReducer.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.usersReducer.token}`,
          },
        }
      );
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        localStorage.setItem("token", data.token);
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const clearToken = createAsyncThunk("token/delete", async (thunkAPI) => {
  localStorage.clear();
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    errorNull: (state) => {
      state.error = null;
    },
    showModalSignIn: (state, action) => {
      state.showSignIn = action.payload;
    },
    showModalSignUp: (state, action) => {
      state.showSignUp = action.payload;
    },
    errorKey: (state, action) => {
      state.key = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
        state.signUp = false;
        state.showSignUp = false;
      })
      .addCase(addUser.pending, (state, action) => {
        state.signUp = true;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload;
        state.signUp = false;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.error = null;
        state.signIn = false;
        state.showSignIn = false;
      })
      .addCase(auth.pending, (state, action) => {
        state.signIn = true;
      })
      .addCase(auth.rejected, (state, action) => {
        state.error = action.payload;
        state.signIn = false;
      })
      .addCase(getKey.fulfilled, (state, action) => {
        state.key = action.payload;
        state.error = null;
        state.signIn = false;
      })
      .addCase(getKey.pending, (state, action) => {
        state.signIn = true;
      })
      .addCase(getKey.rejected, (state, action) => {
        state.error = action.payload;
        state.signIn = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.signIn = false;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.signIn = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.signIn = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.signIn = false;
        state.error = null;
        state.token = null;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.signingIn = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.signIn = false;
      })
      .addCase(clearToken.fulfilled, (state, action) => {
        state.token = null;
      });
  },
});

export const { errorNull, showModalSignIn, showModalSignUp, errorKey } =
  usersSlice.actions;
export default usersSlice.reducer;
