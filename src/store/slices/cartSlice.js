import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  savedForLater: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotals = (state) => {
  state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size);
      
      if (!existingItem) {
        state.items.push(newItem);
      } else {
        existingItem.quantity += newItem.quantity;
      }
      calculateTotals(state);
    },
    removeFromCart(state, action) {
      const { id, color, size } = action.payload;
      state.items = state.items.filter((item) => !(item.id === id && item.color === color && item.size === size));
      calculateTotals(state);
    },
    updateQuantity(state, action) {
      const { id, color, size, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id && item.color === color && item.size === size);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      calculateTotals(state);
    },
    saveForLater(state, action) {
      const item = action.payload;
      state.items = state.items.filter((i) => !(i.id === item.id && i.color === item.color && i.size === item.size));
      state.savedForLater.push(item);
      calculateTotals(state);
    },
    moveToCartFromSaved(state, action) {
      const item = action.payload;
      state.savedForLater = state.savedForLater.filter((i) => !(i.id === item.id && i.color === item.color && i.size === item.size));
      
      const existingItem = state.items.find((i) => i.id === item.id && i.color === item.color && i.size === item.size);
      if (!existingItem) {
        state.items.push(item);
      } else {
        existingItem.quantity += item.quantity;
      }
      calculateTotals(state);
    },
    removeFromSaved(state, action) {
      const { id, color, size } = action.payload;
      state.savedForLater = state.savedForLater.filter((item) => !(item.id === id && item.color === color && item.size === size));
    },
    clearCart(state) {
      state.items = [];
      calculateTotals(state);
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, saveForLater, moveToCartFromSaved, removeFromSaved, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
