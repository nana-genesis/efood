import styled from 'styled-components'
import { useCart, useDispatchCart } from '../context/CartContext'
import { formatCurrency } from '../services/efoodApi'

const Shell = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`

const Header = styled.div`
  margin-bottom: 22px;

  h1 {
    margin: 0 0 8px;
    font-size: clamp(32px, 5vw, 54px);
    line-height: 1;
    text-transform: uppercase;
  }

  p {
    color: var(--muted);
  }
`

const List = styled.div`
  display: grid;
  gap: 12px;
`

const ItemRow = styled.article`
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card);

  @media (max-width: 640px) {
    grid-template-columns: 74px minmax(0, 1fr);
  }
`

const Thumb = styled.img`
  width: 92px;
  height: 76px;
  border-radius: 6px;
  object-fit: cover;

  @media (max-width: 640px) {
    width: 74px;
    height: 64px;
  }
`

const ItemInfo = styled.div`
  min-width: 0;

  h2 {
    margin: 0 0 4px;
    font-size: 18px;
  }

  p {
    color: var(--muted);
  }
`

const Controls = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 640px) {
    grid-column: 1 / -1;
  }
`

const IconButton = styled.button`
  min-width: 38px;
  height: 38px;
  padding: 0 10px;
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
  font-weight: 900;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
`

const Summary = styled.aside`
  height: fit-content;
  padding: 18px;
  border: 1px solid rgba(0, 229, 255, 0.28);
  border-radius: 8px;
  background: linear-gradient(145deg, rgba(16, 13, 29, 0.95), rgba(29, 18, 40, 0.95));

  h2 {
    margin: 0 0 12px;
  }
`

const Total = styled.strong`
  display: block;
  margin: 14px 0;
  color: var(--lime);
  font-size: 28px;
`

const CTA = styled.button`
  width: 100%;
  min-height: 44px;
  color: var(--ink);
  padding: 0 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 900;
  background: linear-gradient(135deg, var(--accent), var(--lime));
`

const Empty = styled.div`
  padding: 34px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--muted);
  background: var(--card);
`

export default function Cart() {
  const cart = useCart() || []
  const dispatch = useDispatchCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  if (cart.length === 0) {
    return (
      <Empty>
        <h1>Seu carrinho esta vazio.</h1>
        <p>Escolha um restaurante e compre um produto para iniciar o pedido.</p>
      </Empty>
    )
  }

  return (
    <>
      <Header>
        <h1>Seu carrinho</h1>
        <p>{count} item(ns) selecionado(s) para a proxima entrega.</p>
      </Header>

      <Shell>
        <List>
          {cart.map((item) => (
            <ItemRow key={item.id}>
              {item.image && <Thumb src={item.image} alt={item.name} />}
              <ItemInfo>
                <h2>{item.name}</h2>
                <p>{formatCurrency(item.price)} x {item.qty}</p>
              </ItemInfo>
              <Controls>
                <IconButton onClick={() => dispatch({ type: 'decrement', id: item.id })}>-</IconButton>
                <IconButton onClick={() => dispatch({ type: 'add', item })}>+</IconButton>
                <IconButton onClick={() => dispatch({ type: 'remove', id: item.id })}>Remover</IconButton>
              </Controls>
            </ItemRow>
          ))}
        </List>

        <Summary>
          <h2>Resumo</h2>
          <p>Total do pedido</p>
          <Total>{formatCurrency(total)}</Total>
          <CTA onClick={() => dispatch({ type: 'clear' })}>Finalizar pedido</CTA>
        </Summary>
      </Shell>
    </>
  )
}
