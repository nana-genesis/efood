import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload
      const existingItem = state.items.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        existingItem.qty += 1
        return
      }

      state.items.push({ ...item, qty: 1 })
    },
    decrementItem(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload)

      if (!item) return

      item.qty -= 1
      state.items = state.items.filter((cartItem) => cartItem.qty > 0)
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, clearCart, decrementItem, removeItem } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.qty, 0)
}

export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => total + item.price * item.qty, 0)
}

export default cartSlice.reducer
