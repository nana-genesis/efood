import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const item = action.item
      const existing = state.find((i) => i.id === item.id)
      if (existing) {
        return state.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...state, { ...item, qty: 1 }]
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
    case 'decrement':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    default:
      throw new Error('Unknown action')
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, [])
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export function useCart() {
  return useContext(CartStateContext)
}

export function useDispatchCart() {
  return useContext(CartDispatchContext)
}
