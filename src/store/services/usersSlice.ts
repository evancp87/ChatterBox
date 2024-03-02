import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TUser } from '../types';
import axios from 'axios';
// const backend = process.env.API_BASE_URL;

type User = {
  email: string;
  password: string;
  repeatPassword?: string;
  token: string | null;
};

type IInitialState = {
  user: User | null;
  loading: boolean;
  token: null | string;
  error: { data: string } | boolean;
  isSuccess: boolean;
  avatar?: string | null;
};

const initialState: IInitialState | User = {
  user: null,
  loading: false,
  token: null,
  isSuccess: false,
  error: false,
  avatar: null
};

export const loginUser = createAsyncThunk<
  TUser,
  { email: string; password: string }
>('users/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.post(
      'http://localhost:6002/users/login',
      { email, password },
      config
    );
    const token = data.token;

    return { ...data, token };
  } catch (error: any) {
    console.log('There was an error', error);
    if (error && error.message) {
      return rejectWithValue(error.message);
    }
  }
});

export const resetPasswordEmail = createAsyncThunk<TUser, { email: string }>(
  'users/resetPasswordEmail',
  async ({ email }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
          // Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.post(
        'http://localhost:6002/users/reset',
        { email },
        config
      );
      return data;
    } catch (error) {
      console.log('There was an error:', error);
      if (error && error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk<
  TUser,
  { password: string; token: string }
>('users/resetPassword', async ({ password, token }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.post(
      'http://localhost:6002/users/update',
      { password, token },
      config
    );
    return data;
  } catch (error) {
    console.log('There was an error:', error);
    if (error && error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const otpEmail = createAsyncThunk<TUser, { email: string }>(
  'users/otpEmail',
  async ({ email }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
          // Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.post(
        'http://localhost:6002/users/oneTimePassword',
        { email },
        config
      );
      return data;
    } catch (error) {
      console.log('There was an error:', error);
      if (error && error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const verifyOtp = createAsyncThunk<
  TUser,
  { email: string; password: string; token: string }
>('users/otp', async ({ email, password, token }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.post(
      'http://localhost:6002/users/verifyOtp',
      { email, password, token },
      config
    );
    return data;
  } catch (error) {
    console.log('There was an error:', error);
    if (error && error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const registerUser = createAsyncThunk<TUser, TUser>(
  'users/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post(
        'http://localhost:6002/users/register',
        { email, password },
        config
      );
      console.log(data, 'checking data');
      return data;
    } catch (error: any) {
      console.log('There was an error', error);
      if (error.response && error.message) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk<TUser>(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.get(
        'http://localhost:6002/users/logout',
        config
      );

      return data;
    } catch (error: any) {
      console.log('There was an error', error);
      if (error.response && error.message) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { email, password, token } = action.payload;
        const userInfo = { email, password, token: token ?? null };
        state.user = userInfo;
        state.loading = false;
        state.error = false;
        state.token = token ?? null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (typeof state.error === 'undefined') {
        }
        state.error = { data: action.error.message || '' };
        state.token = null;
        state.user = null;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { email, password, token } = action.payload;
        const userInfo = { email, password, token: token ?? null };
        state.user = userInfo;
        state.loading = false;
        state.error = false;
        state.isSuccess = true;

        // state.avatar
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = { data: action.error.message || '' };
        state.token = null;
        state.isSuccess = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        return { ...initialState };
      })
      .addCase(logout.rejected, (state, action) => {
        // if (action.payload) {
        //   state.token = action.payload.token;
        //   state.user = action.payload.user;
        // } else {
        //   state.token = null;
        //   state.user = null;
        // }
        state.loading = false;
        state.error = { data: action.error.message || '' };
      });
  }
});

export const {} = usersSlice.actions;

export const selectIsSuccess = (state: RootState) => state.users.isSuccess;
export const selectUser = (state: RootState) => state.users.user;
export const selectError = (state: RootState) => state.users.error;
export const selectLoading = (state: RootState) => state.users.loading;

export default usersSlice.reducer;
