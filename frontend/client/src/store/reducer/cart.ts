/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Cart } from '../../interfaces';
import { sumBy } from 'lodash';

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
        addItem: (state, action: PayloadAction<Cart>) => {
            const productId = action.payload.product._id;
            const existingItemIndex = state.items.findIndex((item: Cart) => item.product._id === productId);
            if (existingItemIndex !== -1) {
                state.items.splice(existingItemIndex, 1);
            } else {
                state.items.push(action.payload);
            }
            state.totalQuantity = sumBy(state.items, 'quantity');
        },
        increaseItem: (state, action: PayloadAction<Cart>) => {
            const productId = action.payload.product._id;
            const existingItemIndex = state.items.findIndex((item: Cart) => item.product._id === productId);
            console.log({ existingItemIndex })
            if (existingItemIndex !== -1) {
                if (state.items[existingItemIndex].quantity < 10) {
                    state.items[existingItemIndex].quantity += 1;
                }
            } else {
                state.items.push(action.payload);
            }
            state.totalQuantity = sumBy(state.items, 'quantity');



        },
        decreaseItem: (state, action: PayloadAction<any>) => {
            const productId = action.payload.product._id;
            const existingItemIndex = state.items.findIndex(item => item.product._id === productId);
            if (state.items[existingItemIndex].quantity > 0) {
                state.items[existingItemIndex].quantity -= 1;
            }
            if (state.items[existingItemIndex].quantity == 0) {
                state.items.splice(existingItemIndex, 1);
            }
            state.totalQuantity = sumBy(state.items, 'quantity');

        },
        selectAll: (state) => {
            const allSelected = state.items.every((item) => item.selected)
            const updatedCart = state.items.map((item) => ({ ...item, selected: !allSelected }));
            state.items = updatedCart;
        },
        deselectAll: (state) => {
            const updatedCart = state.items.map((item) => ({ ...item, selected: false }));
            state.items = updatedCart;
        },
        selectOne: (state, action: PayloadAction<string>) => {
            const updatedCart = state.items.map((item) =>
                item.product._id === action.payload ? { ...item, selected: !item.selected } : item
            );
            state.items = updatedCart;
        }

    }
});

export const cartSelector = (state: any) => state.cart.items;
export const cartTotalSelector = (state: any) => state.cart.totalQuantity;

export const { addItem, increaseItem, decreaseItem, selectAll, deselectAll, selectOne } = cartSlice.actions

export default cartSlice.reducer