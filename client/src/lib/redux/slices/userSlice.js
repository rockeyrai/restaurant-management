import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    userName: null,
    role: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser(state, action) {
      const { userId, userRole, userName } = action.payload;
      state.userId = userId;
      state.role = userRole;
      state.userName = userName;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.userId = null;
      state.userName = null;
      state.role = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
