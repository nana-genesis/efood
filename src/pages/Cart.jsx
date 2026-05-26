import { useCart, useDispatchCart } from '../context/CartContext'
import styled from 'styled-components'

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`

const PageTitle = styled.h2`
  font-size: 36px;
  color: var(--text-h);
  margin: 0 0 32px 0;
`

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
  font-size: 18px;
`

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ItemRow = styled.div`
  background: linear-gradient(135deg, rgba(20, 12, 35, 0.9), rgba(20, 12, 35, 0.5));
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 51, 102, 0.25);
  }
`

const ItemInfo = styled.div`
  flex: 1;
`

const ItemName = styled.div`
  font-weight: 700;
  color: var(--text-h);
  font-size: 16px;
  margin-bottom: 6px;
`

const ItemPrice = styled.div`
  color: var(--text-muted);
  font-size: 14px;
`

const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const QuantityButton = styled.button`
  background: linear-gradient(135deg, rgba(255, 51, 102, 0.2), rgba(0, 212, 255, 0.1));
  color: var(--text);
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 51, 102, 0.3), rgba(0, 212, 255, 0.2));
    border-color: rgba(255, 51, 102, 0.25);
  }
`

const RemoveButton = styled.button`
  background: rgba(255, 51, 102, 0.15);
  color: var(--primary-light);
  border: 1px solid rgba(255, 51, 102, 0.2);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 51, 102, 0.25);
    border-color: rgba(255, 51, 102, 0.4);
  }
`

const Summary = styled.div`
  background: linear-gradient(135deg, rgba(20, 12, 35, 0.9), rgba(20, 12, 35, 0.5));
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--border);
  position: sticky;
  top: 20px;
  height: fit-content;
`

const SummaryTitle = styled.h4`
  font-size: 18px;
  margin: 0 0 16px 0;
  color: var(--text-h);
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: var(--text-muted);
  font-size: 14px;
  
  &:last-of-type {
    border-top: 1px solid var(--border);
    padding-top: 12px;
    margin-top: 12px;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-h);
  }
`

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  margin-top: 20px;
  box-shadow: 0 8px 20px rgba(255, 51, 102, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(255, 51, 102, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const ClearButton = styled.button`
  width: 100%;
  background: rgba(255, 51, 102, 0.1);
  color: var(--primary-light);
  border: 1px solid var(--border);
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  margin-top: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 51, 102, 0.15);
    border-color: rgba(255, 51, 102, 0.25);
  }
`

export default function Cart() {
  const cart = useCart() || []
  const dispatch = useDispatchCart()

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  if (cart.length === 0) {
    return <EmptyMessage>Seu carrinho está vazio. Adicione itens para continuar! 🛒</EmptyMessage>
  }

  return (
    <PageWrapper>
      <PageTitle>Seu Carrinho</PageTitle>

      <CartContainer>
        <ItemsList>
          {cart.map((it) => (
            <ItemRow key={it.id}>
              <ItemInfo>
                <ItemName>{it.name}</ItemName>
                <ItemPrice>R$ {it.price.toFixed(2)} × {it.qty}</ItemPrice>
              </ItemInfo>
              <Controls>
                <QuantityButton onClick={() => dispatch({ type: 'decrement', id: it.id })}>
                  −
                </QuantityButton>
                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '600' }}>
                  {it.qty}
                </span>
                <QuantityButton onClick={() => dispatch({ type: 'add', item: { id: it.id, name: it.name, price: it.price } })}>
                  +
                </QuantityButton>
                <RemoveButton onClick={() => dispatch({ type: 'remove', id: it.id })}>
                  Remover
                </RemoveButton>
              </Controls>
            </ItemRow>
          ))}
        </ItemsList>

        <Summary>
          <SummaryTitle>Resumo do Pedido</SummaryTitle>
          <SummaryRow>
            <span>Subtotal:</span>
            <span>R$ {total.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </SummaryRow>
          <CheckoutButton onClick={() => dispatch({ type: 'clear' })}>
            Finalizar Pedido
          </CheckoutButton>
          <ClearButton onClick={() => dispatch({ type: 'clear' })}>
            Limpar Carrinho
          </ClearButton>
        </Summary>
      </CartContainer>
    </PageWrapper>
  )
}
