import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../store/cartSlice'

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  color: var(--text);
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  background: rgba(9, 7, 16, 0.82);
  backdrop-filter: blur(18px);
`

const Brand = styled(Link)`
  color: #fff;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 0;
  text-transform: lowercase;

  span {
    color: var(--accent);
    text-shadow: 0 0 18px rgba(0, 229, 255, 0.7);
  }
`

const Right = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const NavLink = styled(Link)`
  color: var(--text);
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 8px;

  &:hover {
    border-color: var(--border);
    color: #fff;
  }
`

const CartLink = styled(Link)`
  color: var(--ink);
  position: relative;
  padding: 9px 14px;
  border-radius: 8px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), var(--lime));
  box-shadow: 0 0 22px rgba(0, 229, 255, 0.24);
`

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background: var(--primary-strong);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 999px;
`

export default function Header() {
  const count = useSelector(selectCartCount)

  return (
    <Bar>
      <Brand to="/">e<span>food</span></Brand>
      <Right>
        <NavLink to="/menu">Restaurantes</NavLink>
        <CartLink to="/cart">Carrinho {count > 0 && <Badge>{count}</Badge>}</CartLink>
      </Right>
    </Bar>
  )
}
