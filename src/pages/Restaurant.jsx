import { useParams } from 'react-router-dom'
import restaurants from '../data/restaurants'
import styled from 'styled-components'
import { useDispatchCart } from '../context/CartContext'

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  padding: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const RestaurantHeader = styled.div`
  margin-bottom: 32px;
  
  h2 {
    font-size: 36px;
    margin: 0 0 12px 0;
    color: var(--text-h);
  }
  
  p {
    color: var(--text-muted);
    margin: 0;
  }
`

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ItemCard = styled.div`
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
    box-shadow: 0 8px 24px rgba(255, 51, 102, 0.1);
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
  color: var(--primary-light);
  font-size: 15px;
  font-weight: 700;
`

const AddButton = styled.button`
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  color: var(--bg-dark);
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 6px 16px rgba(0, 212, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const InfoCard = styled.div`
  background: linear-gradient(135deg, rgba(20, 12, 35, 0.9), rgba(20, 12, 35, 0.5));
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--border);
  
  h4 {
    font-size: 16px;
    margin: 0 0 12px 0;
    color: var(--text-h);
  }
  
  p {
    margin: 8px 0;
    color: var(--text-muted);
    font-size: 14px;
  }
`

const NotFound = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: var(--text-muted);
  font-size: 18px;
`

export default function Restaurant() {
  const { id } = useParams()
  const rest = restaurants.find((r) => r.id === id)
  const dispatch = useDispatchCart()

  if (!rest) {
    return <NotFound>Restaurante não encontrado</NotFound>
  }

  function add(item) {
    dispatch({ type: 'add', item })
  }

  return (
    <PageWrapper>
      <RestaurantHeader>
        <h2>{rest.name}</h2>
        <p>{rest.description}</p>
      </RestaurantHeader>

      <Layout>
        <div>
          <h3 style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--text-h)' }}>Pratos</h3>
          <ItemsList>
            {rest.items.map((it) => (
              <ItemCard key={it.id}>
                <ItemInfo>
                  <ItemName>{it.name}</ItemName>
                  <ItemPrice>R$ {it.price.toFixed(2)}</ItemPrice>
                </ItemInfo>
                <AddButton onClick={() => add({ id: it.id, name: it.name, price: it.price })}>
                  Adicionar
                </AddButton>
              </ItemCard>
            ))}
          </ItemsList>
        </div>

        <Sidebar>
          <InfoCard>
            <h4>ℹ️ Informações</h4>
            <p><strong>Categoria:</strong> {rest.category}</p>
            <p><strong>Avaliação:</strong> ⭐ {rest.rating}</p>
          </InfoCard>
        </Sidebar>
      </Layout>
    </PageWrapper>
  )
}
