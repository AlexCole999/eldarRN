import { configureStore } from '@reduxjs/toolkit';
import filterSlice from "./filterSlice";


const store = configureStore({
  reducer: {
    filters: filterSlice.reducer,
  },
});

export default store;
