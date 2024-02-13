import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			state.cart.push(action.payload);
		},
		deleteItem(state, action) {
			state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
		},
		increasingItemQuantity(state, action) {
			const item = state.cart.find((item) => item.pizzaId === action.payload);
			item.quantity++;
			item.totalPrice = item.quantity * item.unitPrice;
		},
		decreasingItemQuantity(state, action) {
			const item = state.cart.find((item) => item.pizzaId === action.payload);
			item.quantity--;
			item.totalPrice = item.quantity * item.unitPrice;
			if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
		},
		clearCart(state) {
			state.cart = [];
		},
	},
});

export const { addItem, deleteItem, increasingItemQuantity, decreasingItemQuantity, clearCart } =
	cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (stete) => stete.cart.cart;

export const getTotalCartItems = (state) => state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);
export const getTotalCartPrice = (state) => state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
