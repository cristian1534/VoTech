import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUserAsync = createAsyncThunk(
  "register/registerUser",
  async (user: IUser) => {
    try {
      const response = await axios.post(
        "https://votech.onrender.com/users",
        user
      );
      const {data} = response;
      console.log(data)
      return response.data as IUser;
    } catch (err) {
      return err;
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
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
        console.log(action.error);
      });
  },
});

export default registerSlice.reducer;
