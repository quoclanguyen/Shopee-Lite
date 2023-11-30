/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Cart } from '../../interfaces';

interface CartState {
    items: Cart[];
    totalQuantity: number;
}
const initialState: CartState = {
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<any>) => {
            const productId = action.payload.product.id;
            const existingItemIndex = state.items.findIndex(item => item.product.id === productId);
            if (existingItemIndex !== -1) {
                state.items.splice(existingItemIndex, 1);
                state.totalQuantity -= 1;
            } else {
                state.items.push(action.payload);
                state.totalQuantity += 1;
            }
        },
        increaseItem: (state, action: PayloadAction<any>) => {
            const productId = action.payload.product.id;
            const existingItemIndex = state.items.findIndex(item => item.product.id === productId);
            console.log({ existingItemIndex })
            if (existingItemIndex !== -1) {
                if (state.items[existingItemIndex].quantity < 10) {
                    state.totalQuantity += 1;
                    state.items[existingItemIndex].quantity += 1;
                }
            } else {
                state.items.push(action.payload);
                state.totalQuantity += 1;
            }



        },
        decreaseItem: (state, action: PayloadAction<any>) => {
            const productId = action.payload.product.id;
            const existingItemIndex = state.items.findIndex(item => item.product.id === productId);
            if (state.items[existingItemIndex].quantity > 0) {
                state.totalQuantity -= 1;
                state.items[existingItemIndex].quantity -= 1;
            }
            if (state.items[existingItemIndex].quantity == 0) {
                state.items.splice(existingItemIndex, 1);
            }

        }

    }
});

export const cartSelector = (state: any) => state.cart.items;
export const cartTotalSelector = (state: any) => state.cart.totalQuantity;

export const { addItem, increaseItem, decreaseItem } = cartSlice.actions

export default cartSlice.reducer