/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CartState {
    items: any[];
}
const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<any>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<any>) => {
            const elementToRemove = action.payload;
            let removed = false;
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i] === elementToRemove && !removed) {
                    state.items.splice(i, 1);
                    removed = true;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        }

    }
});

export const cartSelector = (state: any) => state.cart.items;

export const { addItem, clearCart, removeItem } = cartSlice.actions

export default cartSlice.reducer