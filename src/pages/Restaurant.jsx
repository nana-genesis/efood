import { useParams } from 'react-router-dom'
import restaurants from '../data/restaurants'
import styled from 'styled-components'
import { useDispatchCart } from '../context/CartContext'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
`

const CTA = styled.button`
  background: #ff5a5f;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`

export default function Restaurant() {
  const { id } = useParams()
  const rest = restaurants.find((r) => r.id === id)
  const dispatch = useDispatchCart()

  if (!rest) return <div>Restaurante não encontrado</div>

  function add(item) {
    dispatch({ type: 'add', item })
  }

  return (
    <Layout>
      <div>
        <h2>{rest.name}</h2>
        <p>{rest.description}</p>

        <h3>Pratos</h3>
        {rest.items.map((it) => (
          <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{it.name}</div>
              <div style={{ color: '#666' }}>R$ {it.price.toFixed(2)}</div>
            </div>
            <CTA onClick={() => add({ id: it.id, name: it.name, price: it.price })}>Adicionar</CTA>
          </div>
        ))}
      </div>

      <aside>
        <div style={{ background: '#fff', padding: 16, borderRadius: 12 }}>
          <h4>Informações</h4>
          <p>Categoria: {rest.category}</p>
          <p>Avaliação: {rest.rating}</p>
        </div>
      </aside>
    </Layout>
  )
}
