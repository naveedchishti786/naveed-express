import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const newItem = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === newItem.id);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(newItem);
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
