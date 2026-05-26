import styled from 'styled-components'
import restaurants from '../data/restaurants'
import { Link } from 'react-router-dom'
import { useDispatchCart } from '../context/CartContext'

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`

const PageTitle = styled.h2`
  font-size: 40px;
  color: var(--text-h);
  margin: 40px 0 32px 0;
  background: linear-gradient(90deg, var(--text-h), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
  padding: 40px 0;
`

const Card = styled.div`
  background: linear-gradient(135deg, rgba(20, 12, 35, 0.9), rgba(20, 12, 35, 0.5));
  border-radius: 20px;
  padding: 28px;
  border: 1px solid var(--border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 51, 102, 0.25);
    box-shadow: 0 12px 40px rgba(255, 51, 102, 0.15);
  }
`

const RestaurantLink = styled(Link)`
  color: var(--text-h);
  text-decoration: none;
  
  h3 {
    font-size: 20px;
    margin: 0 0 12px 0;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--accent-light);
    }
  }
`

const Info = styled.p`
  color: var(--text-muted);
  font-size: 14px;
  margin: 0 0 4px 0;
`

const Description = styled.p`
  color: var(--text);
  font-size: 14px;
  margin: 12px 0 16px 0;
  line-height: 1.5;
`

const ItemsContainer = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 51, 102, 0.1);
`

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const ItemInfo = styled.div`
  flex: 1;
`

const ItemName = styled.div`
  font-weight: 600;
  color: var(--text);
  font-size: 15px;
  margin-bottom: 4px;
`

const ItemPrice = styled.div`
  color: var(--primary-light);
  font-size: 13px;
  font-weight: 700;
`

const AddButton = styled.button`
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  color: var(--bg-dark);
  border: none;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
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

export default function Menu() {
  const dispatch = useDispatchCart()

  function addSample(item) {
    dispatch({ type: 'add', item })
  }

  return (
    <PageWrapper>
      <PageTitle>Todos os restaurantes</PageTitle>
      <Grid>
        {restaurants.map((r) => (
          <Card key={r.id}>
            <RestaurantLink to={`/restaurant/${r.id}`}>
              <h3>{r.name}</h3>
            </RestaurantLink>
            <Info>{r.category} • ⭐ {r.rating}</Info>
            <Description>{r.description}</Description>
            
            <ItemsContainer>
              {r.items.slice(0, 2).map((it) => (
                <ItemRow key={it.id}>
                  <ItemInfo>
                    <ItemName>{it.name}</ItemName>
                    <ItemPrice>R$ {it.price.toFixed(2)}</ItemPrice>
                  </ItemInfo>
                  <AddButton onClick={() => addSample({ id: it.id, name: it.name, price: it.price })}>
                    Adicionar
                  </AddButton>
                </ItemRow>
              ))}
            </ItemsContainer>
          </Card>
        ))}
      </Grid>
    </PageWrapper>
  )
}
