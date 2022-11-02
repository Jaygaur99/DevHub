import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  authAction,
  authSliceIntialState,
  emailAction,
  refreshTokenAction,
} from "Types";

const initialState: authSliceIntialState = {
  login: false,
  email: "",
  mobile: "",
  authType: "EMAIL",
  id: "",
  userId: "",
  username: "",
  name: "",
  photo: "",
  activated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (
      state: authSliceIntialState,
      action: PayloadAction<emailAction>
    ) => {
      state.authType = action.payload.authType;
      if (action.payload.authType === "MOBILE") {
        state.mobile = action.payload.mobile;
        state.email = "";
      } else {
        state.email = action.payload.email;
        state.mobile = "";
      }
      console.log(action);
    },

    setAuth: (
      state: authSliceIntialState,
      action: PayloadAction<authAction>
    ) => {
      console.log(action);
      state.login = true;
      state.id = action.payload._id;
      state.userId = action.payload.user_id;
    },

    setUserRefreshToken: (
      state: authSliceIntialState,
      action: PayloadAction<refreshTokenAction>
    ) => {
      if (action.payload.user.mobile) {
        state.authType = "MOBILE";
        state.mobile = action.payload.user.mobile;
      } else if (action.payload.user.email) {
        state.authType = "EMAIL";
        state.email = action.payload.user.email;
      }
      console.log(action);
      state.login = true;
      state.userId = action.payload.user.user_id;
      state.id = action.payload.user._id;
      state.activated = action.payload.user.activated;

      if (action.payload.user.activated) {
        state.photo = action.payload.user.profile_photo.secure_url;
        state.name = action.payload.user.name;
        state.username = action.payload.user.username;
      }
    },

    setActivate: (
      state: authSliceIntialState,
      action: PayloadAction<refreshTokenAction>
    ) => {
      console.log(action);
      state.username = action.payload.user.username;
      state.name = action.payload.user.name;
      state.photo = action.payload.user.profile_photo.secure_url;
      state.activated = action.payload.user.activated;
    },
    logoutUserAuth: (state: authSliceIntialState) => {
      state.login = false;
      state.email = "";
      state.mobile = "";
      state.authType = "EMAIL";
      state.id = "";
      state.userId = "";
      state.username = "";
      state.name = "";
      state.photo = "";
      state.activated = false;
    },
  },
  extraReducers: (builders) => {
    //
  },
});

export const authReducer = authSlice.reducer;
export const {
  setEmail,
  setAuth,
  setUserRefreshToken,
  setActivate,
  logoutUserAuth,
} = authSlice.actions;
