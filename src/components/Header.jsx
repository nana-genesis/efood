import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Bar = styled.header`
  background: #ff5a5f;
  color: white;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export default function Header() {
  const cart = useCart() || []
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <Bar>
      <Link to="/" style={{ color: 'white', fontWeight: 700 }}>efood</Link>
      <Right>
        <Link to="/menu" style={{ color: 'white' }}>Menu</Link>
        <Link to="/cart" style={{ color: 'white' }}>Carrinho ({count})</Link>
      </Right>
    </Bar>
  )
}
