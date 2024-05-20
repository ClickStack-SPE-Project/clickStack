import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    logged: localStorage.getItem("accesstoken") ? true : false,
    type: localStorage.getItem("utype") ? localStorage.getItem("utype") : "",
    name: localStorage.getItem("uname") ? localStorage.getItem("uname") : "",
  },
  reducers: {
    saveLogin: (state, action) => {
      state.logged = action.payload.logged;
      state.type = action.payload.type;
      state.name = action.payload.name;

      localStorage.setItem("utype", action.payload.type);
      localStorage.setItem("uname", action.payload.name);
    },
    logout: (state, action) => {
      state.logged = false;
      state.type = "";
      state.name = "";

      localStorage.clear();
    },
  },
});

export const { saveLogin, logout } = userSlice.actions;

export default userSlice.reducer;
