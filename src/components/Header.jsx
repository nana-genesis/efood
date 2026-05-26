import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Bar = styled.header`
  background: linear-gradient(90deg, rgba(255, 51, 102, 0.15), rgba(0, 212, 255, 0.08));
  border-bottom: 2px solid rgba(255, 51, 102, 0.12);
  color: white;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`

const Brand = styled(Link)`
  color: var(--text-h);
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(90deg, var(--text-h), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
  
  &:hover {
    filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.3));
  }
`

const Right = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`

const NavLink = styled(Link)`
  color: var(--text);
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: var(--accent-light);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`

const CartLink = styled(NavLink)`
  position: relative;
`

const Badge = styled.span`
  position: absolute;
  top: -10px;
  right: -12px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(255, 51, 102, 0.4);
  min-width: 20px;
  text-align: center;
`

export default function Header() {
  const cart = useCart() || []
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <Bar>
      <Brand to="/">efood</Brand>
      <Right>
        <NavLink to="/menu">Menu</NavLink>
        <CartLink to="/cart">
          Carrinho
          {count > 0 && <Badge>{count}</Badge>}
        </CartLink>
      </Right>
    </Bar>
  )
}
