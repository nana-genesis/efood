import { useCart, useDispatchCart } from '../context/CartContext'
import styled from 'styled-components'

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`

const CTA = styled.button`
  background: #ff5a5f;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`

export default function Cart() {
  const cart = useCart() || []
  const dispatch = useDispatchCart()

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  if (cart.length === 0) return <div>Seu carrinho está vazio.</div>

  return (
    <div>
      <h2>Seu Carrinho</h2>
      {cart.map((it) => (
        <ItemRow key={it.id}>
          <div>
            <div style={{ fontWeight: 700 }}>{it.name}</div>
            <div style={{ color: '#666' }}>R$ {it.price.toFixed(2)} x {it.qty}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => dispatch({ type: 'decrement', id: it.id })}>-</button>
            <button onClick={() => dispatch({ type: 'add', item: { id: it.id, name: it.name, price: it.price } })}>+</button>
            <button onClick={() => dispatch({ type: 'remove', id: it.id })}>Remover</button>
          </div>
        </ItemRow>
      ))}

      <div style={{ marginTop: 12, fontWeight: 700 }}>Total: R$ {total.toFixed(2)}</div>
      <div style={{ marginTop: 12 }}>
        <CTA onClick={() => dispatch({ type: 'clear' })}>Finalizar pedido</CTA>
      </div>
    </div>
  )
}
