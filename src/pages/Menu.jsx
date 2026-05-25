import styled from 'styled-components'
import restaurants from '../data/restaurants'
import { Link } from 'react-router-dom'
import { useDispatchCart } from '../context/CartContext'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`

const CTA = styled.button`
  background: #ff5a5f;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`

export default function Menu() {
  const dispatch = useDispatchCart()

  function addSample(item) {
    dispatch({ type: 'add', item })
  }

  return (
    <div>
      <h2>Restaurantes</h2>
      <Grid>
        {restaurants.map((r) => (
          <Card key={r.id}>
            <h3>
              <Link to={`/restaurant/${r.id}`}>{r.name}</Link>
            </h3>
            <p>{r.category} • {r.rating}</p>
            <p>{r.description}</p>
            <div style={{ marginTop: 8 }}>
              {r.items.slice(0, 2).map((it) => (
                <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{it.name}</div>
                    <div style={{ color: '#666' }}>R$ {it.price.toFixed(2)}</div>
                  </div>
                  <CTA onClick={() => addSample({ id: it.id, name: it.name, price: it.price })}>Adicionar</CTA>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  )
}
