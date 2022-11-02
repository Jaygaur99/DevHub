import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  activateInitalState,
  setAvatarPayload,
  setNamePayload,
  setUsernamePayload,
} from "Types";

const initialState: activateInitalState = {
  name: "",
  avatar: "",
  username: "",
};

const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setName: (
      state: activateInitalState,
      action: PayloadAction<setNamePayload>
    ) => {
      console.log(action);
      state.name = action.payload.name;
    },
    setAvatar: (
      state: activateInitalState,
      action: PayloadAction<setAvatarPayload>
    ) => {
      console.log(action);
      state.avatar = action.payload.avatar;
    },
    setUsername: (
      state: activateInitalState,
      action: PayloadAction<setUsernamePayload>
    ) => {
      console.log(action);
      state.username = action.payload.username;
    },

    resetAuthenticate: (state: activateInitalState) => {
      state.avatar = "";
      state.name = "";
      state.username = "";
    },
  },
  extraReducers: (builders) => {
    //
  },
});

export const activateReducer = activateSlice.reducer;
export const { setName, setAvatar, setUsername, resetAuthenticate } =
  activateSlice.actions;
