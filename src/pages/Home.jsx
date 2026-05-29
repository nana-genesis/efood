import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRestaurants } from '../services/efoodApi'

const Wrapper = styled.div`
  display: grid;
  gap: 36px;
`

const Hero = styled.section`
  min-height: 430px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 28px;
  align-items: end;
  padding: 46px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background:
    linear-gradient(90deg, rgba(9, 7, 16, 0.94), rgba(9, 7, 16, 0.46)),
    url(${({ $image }) => $image});
  background-position: center;
  background-size: cover;
  box-shadow: var(--shadow);

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 6px;
    background: linear-gradient(90deg, var(--primary), var(--accent), var(--lime));
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 32px 22px;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 640px;
`

const Kicker = styled.span`
  display: inline-flex;
  margin-bottom: 14px;
  color: var(--lime);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
`

const Title = styled.h1`
  max-width: 760px;
  margin: 0 0 16px;
  color: #fff;
  font-size: clamp(38px, 7vw, 76px);
  line-height: 0.96;
  letter-spacing: 0;
  text-transform: uppercase;
  text-shadow: 4px 4px 0 rgba(255, 47, 114, 0.42);
`

const Subtitle = styled.p`
  max-width: 620px;
  margin: 0 0 24px;
  color: var(--muted);
  font-size: 18px;
`

const Search = styled.form`
  display: flex;
  gap: 10px;
  max-width: 620px;

  @media(max-width: 600px) {
    flex-direction: column;
  }
`

const Input = styled.input`
  flex: 1;
  min-width: 0;
  color: #fff;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid rgba(0, 229, 255, 0.32);
  background: rgba(255, 255, 255, 0.08);
  outline: none;

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.12);
  }
`

const CTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 8px;
  color: var(--ink);
  font-weight: 900;
  background: linear-gradient(135deg, var(--accent), var(--lime));
`

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;

  h2 {
    margin: 0;
    font-size: 28px;
  }

  a {
    color: var(--accent);
    font-weight: 800;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
`

const Card = styled(Link)`
  min-height: 250px;
  display: flex;
  align-items: end;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background:
    linear-gradient(to top, rgba(9, 7, 16, 0.94), rgba(9, 7, 16, 0.12)),
    url(${({ $image }) => $image});
  background-position: center;
  background-size: cover;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(0, 229, 255, 0.52);
    box-shadow: 0 0 28px rgba(0, 229, 255, 0.18);
  }
`

const CardInfo = styled.div`
  width: 100%;

  h3 {
    margin: 0 0 8px;
    color: #fff;
  }

  p {
    margin: 0;
    color: var(--muted);
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`

const Tag = styled.span`
  color: ${({ $dark }) => ($dark ? 'var(--ink)' : '#fff')};
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  background: ${({ $dark }) => ($dark ? 'var(--lime)' : 'rgba(255, 47, 114, 0.86)')};
`

const Message = styled.p`
  color: var(--muted);
`

export default function Home() {
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

  const heroRestaurant = restaurants.find((restaurant) => restaurant.destacado) || restaurants[0]
  const highlighted = filteredRestaurants.slice(0, 6)

  return (
    <Wrapper>
      <Hero $image={heroRestaurant?.capa}>
        <HeroContent>
          <Kicker>Delivery em modo neon</Kicker>
          <Title>efood</Title>
          <Subtitle>
            Restaurantes selecionados, pratos reais da API EBAC e uma compra com poucos cliques.
          </Subtitle>

          <Search onSubmit={(event) => event.preventDefault()}>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque por restaurante, cozinha ou prato"
            />
            <CTA to="/menu">Ver restaurantes</CTA>
          </Search>
        </HeroContent>
      </Hero>

      <section>
        <SectionTitle>
          <h2>Restaurantes em destaque</h2>
          <Link to="/menu">Abrir cardapios</Link>
        </SectionTitle>

        {status === 'loading' && <Message>Carregando restaurantes...</Message>}
        {status === 'error' && <Message>Nao foi possivel carregar os restaurantes agora.</Message>}

        <Grid>
          {highlighted.map((restaurant) => (
            <Card key={restaurant.id} to={`/restaurant/${restaurant.id}`} $image={restaurant.capa}>
              <CardInfo>
                <Tags>
                  {restaurant.destacado && <Tag $dark>Destaque</Tag>}
                  <Tag>{restaurant.tipo}</Tag>
                </Tags>
                <h3>{restaurant.titulo}</h3>
                <p>Nota {restaurant.avaliacao} • {restaurant.cardapio.length} pratos</p>
              </CardInfo>
            </Card>
          ))}
        </Grid>
      </section>
    </Wrapper>
  )
}
