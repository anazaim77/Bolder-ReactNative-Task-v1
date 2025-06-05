import {
  AuthCallbacks,
  AuthLogoutCallbacks,
  authService,
} from "@/services/api/auth";
import { StateTypes } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface SignInParams {
  email: string;
  password: string;
}

interface SignUpParams extends SignInParams {
  name?: string;
}

// interface AuthCallbacks {
//   onSuccess?: (response: { user: StateTypes.User; token: string }) => void;
//   onError?: (error: any) => void;
// }

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    { params, callbacks }: { params: SignInParams; callbacks?: AuthCallbacks },
    { rejectWithValue }
  ) =>
    authService
      .signIn(params, callbacks)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.msg || "Failed to sign in"))
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    { params, callbacks }: { params: SignUpParams; callbacks?: AuthCallbacks },
    { rejectWithValue }
  ) =>
    authService
      .signUp(params, callbacks)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.msg || "Failed to sign up"))
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (callbacks: AuthLogoutCallbacks, { rejectWithValue }) =>
    authService
      .signOut(callbacks)
      .catch((error) => rejectWithValue(error.msg || "Failed to sign out"))
);

const initialState: StateTypes.AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      })
      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;

export const useAuthSelector = () =>
  useSelector((state: RootState) => state.auth);
