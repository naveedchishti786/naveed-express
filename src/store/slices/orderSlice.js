import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    { orderId: 'ORD-12345678', total: 100, date: new Date().toISOString(), status: 'Shipped' }
  ],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // action.payload should be an object containing order details, including orderId
      state.orders.push(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
