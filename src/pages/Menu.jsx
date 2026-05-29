import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { formatCurrency, getRestaurants } from '../services/efoodApi'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: end;
  margin-bottom: 22px;

  h1 {
    margin: 0 0 6px;
    font-size: clamp(32px, 5vw, 54px);
    line-height: 1;
    text-transform: uppercase;
  }

  p {
    max-width: 600px;
    margin: 0;
    color: var(--muted);
  }

  @media (max-width: 720px) {
    align-items: start;
    flex-direction: column;
  }
`

const Search = styled.input`
  width: min(100%, 330px);
  color: #fff;
  padding: 12px 14px;
  border: 1px solid rgba(0, 229, 255, 0.34);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  outline: none;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
`

const Card = styled.article`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--card);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
`

const Cover = styled(Link)`
  min-height: 190px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  background:
    linear-gradient(to top, rgba(9, 7, 16, 0.54), rgba(9, 7, 16, 0.08)),
    url(${({ $image }) => $image});
  background-position: center;
  background-size: cover;
`

const Badge = styled.span`
  color: ${({ $accent }) => ($accent ? 'var(--ink)' : '#fff')};
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  background: ${({ $accent }) => ($accent ? 'var(--accent)' : 'rgba(255, 47, 114, 0.86)')};
`

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;

  h2 {
    margin: 0 0 8px;
    font-size: 22px;
  }

  p {
    color: var(--muted);
  }
`

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 12px;
  color: var(--lime);
  font-weight: 800;
`

const Sample = styled.div`
  display: grid;
  gap: 8px;
  margin: 16px 0;
`

const Dish = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 14px;
`

const CTA = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 42px;
  margin-top: auto;
  color: var(--ink);
  padding: 0 14px;
  border-radius: 8px;
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary), var(--accent));
`

const Message = styled.p`
  color: var(--muted);
`

export default function Menu() {
  const [restaurants, setRestaurants] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    getRestaurants()
      .then((data) => {
        setRestaurants(data)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  const filteredRestaurants = useMemo(() => {
    const search = query.trim().toLowerCase()

    if (!search) return restaurants

    return restaurants.filter((restaurant) => {
      return `${restaurant.titulo} ${restaurant.tipo} ${restaurant.descricao}`.toLowerCase().includes(search)
    })
  }, [query, restaurants])

  return (
    <div>
      <Header>
        <div>
          <h1>Restaurantes</h1>
          <p>Cardapios carregados via AJAX da API EBAC, com fotos e precos reais.</p>
        </div>
        <Search
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filtrar restaurantes"
        />
      </Header>

      {status === 'loading' && <Message>Carregando restaurantes...</Message>}
      {status === 'error' && <Message>Nao foi possivel carregar a lista agora.</Message>}

      <Grid>
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id}>
            <Cover to={`/restaurant/${restaurant.id}`} $image={restaurant.capa}>
              {restaurant.destacado && <Badge $accent>Destaque</Badge>}
              <Badge>{restaurant.tipo}</Badge>
            </Cover>
            <Body>
              <Meta>
                <span>Nota {restaurant.avaliacao}</span>
                <span>{restaurant.cardapio.length} pratos</span>
              </Meta>
              <h2>{restaurant.titulo}</h2>
              <p>{restaurant.descricao}</p>
              <Sample>
                {restaurant.cardapio.slice(0, 2).map((dish) => (
                  <Dish key={dish.id}>
                    <span>{dish.nome}</span>
                    <strong>{formatCurrency(dish.preco)}</strong>
                  </Dish>
                ))}
              </Sample>
              <CTA to={`/restaurant/${restaurant.id}`}>Ver cardapio</CTA>
            </Body>
          </Card>
        ))}
      </Grid>
    </div>
  )
}
