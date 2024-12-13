import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const newItem = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === newItem.id);  

        state.totalQuantity++;

        if (!existingItem) {
            state.cartItems.push({
                id: newItem.id,
                productName: newItem.productName,
                imgUrl: newItem.imgUrl,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
            });
        } else {
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }

        // Recalculate the total amount after changes
        state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);  
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
  
      if (existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
      }

      // Recalculate the total amount after deletion
      state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);  
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
