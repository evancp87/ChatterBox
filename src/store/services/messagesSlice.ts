// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";
// import {TUser} from "../types";
// import axios from "axios";

// type IInitialState  = {
//    user: null | string;
//    loading: boolean;
//    token: null | string,
//    error: boolean;
//    avatar?: string;
//   }

//   const initialState: IInitialState = {
//     user: null,
//     loading: false,
//     token: null,
//     error: false,
//     avatar: null

// }

// export const loginUser = createAsyncThunk<TUser, TUser>("users/login", async ({username, password}, {rejectWithValue}) => {
// try {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };
//     const {data} = await axios.post("http://localhost:6002/users/login", {username, password}, config)
//   return data;
// } catch (error: any) {
//     console.log("There was an error", error);
//     if (error.response && error.response.data.message) {
//       return rejectWithValue(error.response.data.message);
//     } else {
//       return rejectWithValue(error.message);
//     }
// }
// })

// export const registerUser = createAsyncThunk<TUser, TUser>("users/register", async ({username, password}, {rejectWithValue}) => {
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };
//         const {data} = await axios.post("http://localhost:6002/users/register", {username, password}, config)
//       return data;
//     } catch (error: any) {
//         console.log("There was an error", error);
//         if (error.response && error.response.data.message) {
//           return rejectWithValue(error.response.data.message);
//         } else {
//           return rejectWithValue(error.message);
//         }
//     }
//     })

// const messagesSlice = createSlice({
//     name: "users",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//      builder
//      .addCase(loginUser.pending, (state, action) => {
//         state.user = action.payload;
//         state.
//      })
//      .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.
//      })
//      .addCase(loginUser.rejected, (state, action) => {
//         state.user = action.payload;
//         state.
//      })
//      .addCase(registerUser.pending, (state, action) => {}).
//      addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.loading = false;
//         state.error = false;
//         // state.avatar

//      }).addCase(registerUser.rejected, (state, action) => {})

//     }

// })

// export const {} = usersSlice.actions;

// export const selectUser = state.users.username;

// export default usersSlice.reducer;
