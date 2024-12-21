import { configureStore, createSlice } from '@reduxjs/toolkit';
import filterSlice from "./filterSlice";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    filters: filterSlice.reducer,
    user: userSlice.reducer,
  },
});

export const { setUser } = userSlice.actions;
export default store;
