import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Bar = styled.header`
  background: var(--primary);
  color: white;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Brand = styled(Link)`
  color: white;
  font-weight: 800;
  font-size: 20px;
`

const Right = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`

const CartLink = styled(Link)`
  color: white;
  position: relative;
`

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background: #222;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 999px;
`

export default function Header() {
  const cart = useCart() || []
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <Bar>
      <Brand to="/">efood</Brand>
      <Right>
        <Link to="/menu" style={{ color: 'white' }}>Menu</Link>
        <CartLink to="/cart">Carrinho {count > 0 && <Badge>{count}</Badge>}</CartLink>
      </Right>
    </Bar>
  )
}
