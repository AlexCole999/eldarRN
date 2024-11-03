import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    title: '',
    city: '',
    district: '',
    category: '',
    subcategory: '',
    coworking: false,
    priceFrom: '',
    priceTo: '',
    currency: ''
  },
  reducers: {
    filterTitle: (state, action) => {
      state.title = action.payload;
    },
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
    filterCoworking: (state, action) => {
      state.coworking = action.payload;
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
      state.title = '';
      state.city = '';
      state.district = '';
      state.category = '';
      state.subcategory = '';
      state.coworking = false
      state.priceFrom = '';
      state.priceTo = '';
      state.currency = '';
    },
  },
});

export const {
  filterTitle,
  filterCity,
  filterDistrict,
  filterCategory,
  filterSubcategory,
  filterCoworking,
  filterPriceFrom,
  filterPriceTo,
  filterCurrency,
  deleteFilters,
} = filterSlice.actions;

export default filterSlice;
