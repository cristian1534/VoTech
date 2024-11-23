import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUserAsync = createAsyncThunk(
  "register/registerUser",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://votech.onrender.com/users",
        user
      );
      return response.data as IUser;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Unexpected error");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export interface IUser {
  name: string;
  email: string;
  password: string;
}
interface RegisterState {
  user: IUser;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: RegisterState = {
  user: {
    name: "",
    email: "",
    password: "",
  },
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUser;
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export default registerSlice.reducer;
