import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    city: '',
    district: '',
    category: '',
    subcategory: '',
    priceFrom: '',
    priceTo: '',
    currency: ''
  },
  reducers: {
    filterCity: (state, action) => {
      state.city = action.payload;
    },
    filterDistrict: (state, action) => {
      state.district = action.payload;
    },
    filterCategory: (state, action) => {
      state.category = action.payload;
    },
    filterSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },
    filterPriceFrom: (state, action) => {
      state.priceFrom = action.payload;
    },
    filterPriceTo: (state, action) => {
      state.priceTo = action.payload;
    },
    filterCurrency: (state, action) => {
      state.currency = action.payload;
    },
    deleteFilters: (state) => {
      state.city = '';
      state.district = '';
      state.category = '';
      state.subcategory = '';
      state.priceFrom = '';
      state.priceTo = '';
      state.currency = '';
    },
  },
});

export const {
  filterCity,
  filterDistrict,
  filterCategory,
  filterSubcategory,
  filterPriceFrom,
  filterPriceTo,
  filterCurrency,
  deleteFilters,
} = filterSlice.actions;

export default filterSlice;
