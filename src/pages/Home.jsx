import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import heroImg from '../assets/hero.png'
import restaurants from '../data/restaurants'

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 48px;
  align-items: center;
  padding: 60px 0 80px;
  
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 40px 0 60px;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Title = styled.h2`
  font-size: 48px;
  margin: 0;
  color: var(--text-h);
  line-height: 1.1;
  background: linear-gradient(90deg, var(--text-h), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-size: 18px;
  line-height: 1.5;
`

const SearchBox = styled.form`
  display: flex;
  gap: 12px;
  background: rgba(20, 12, 35, 0.6);
  padding: 16px;
  border-radius: 20px;
  border: 2px solid var(--border);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: rgba(255, 51, 102, 0.35);
    box-shadow: 0 0 30px rgba(255, 51, 102, 0.15);
  }
`

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 16px;
  outline: none;
  
  &::placeholder {
    color: var(--text-muted);
  }
`

const SearchButton = styled.button`
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 8px 20px rgba(255, 51, 102, 0.3);
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(255, 51, 102, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const CTAButton = styled.button`
  align-self: flex-start;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  color: var(--bg-dark);
  border: none;
  padding: 14px 28px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 212, 255, 0.4);
  }
  
  @media (max-width: 860px) {
    align-self: center;
  }
`

const Right = styled.div`
  display: flex;
  justify-content: center;
`

const HeroImage = styled.img`
  width: 100%;
  max-width: 380px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(0, 212, 255, 0.15);
  
  @media (max-width: 860px) {
    max-width: 300px;
  }
`

const RestaurantsSection = styled.div`
  margin-top: 80px;
  padding-bottom: 60px;
`

const SectionTitle = styled.h3`
  font-size: 28px;
  margin: 0 0 32px 0;
  color: var(--text-h);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`

const Card = styled.div`
  background: linear-gradient(135deg, rgba(20, 12, 35, 0.9), rgba(20, 12, 35, 0.5));
  border-radius: 20px;
  padding: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 51, 102, 0.25);
    box-shadow: 0 12px 40px rgba(255, 51, 102, 0.15);
  }
`

const RestaurantName = styled.h4`
  font-size: 18px;
  margin: 0 0 8px 0;
  color: var(--text-h);
`

const RestaurantInfo = styled.p`
  color: var(--text-muted);
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`

export default function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <Wrapper>
      <Hero>
        <Left>
          <Title>Peça comida rápida e gostosa</Title>
          <Subtitle>Encontre os melhores restaurantes perto de você e receba em casa.</Subtitle>

          <SearchBox onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Busque restaurantes ou comidas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchButton type="submit">Pesquisar</SearchButton>
          </SearchBox>

          <CTAButton onClick={() => navigate('/menu')}>
            Ver todos os restaurantes
          </CTAButton>
        </Left>

        <Right>
          <HeroImage src={heroImg} alt="Entrega de comida" />
        </Right>
      </Hero>

      <RestaurantsSection>
        <SectionTitle>
          {search ? `Resultados para "${search}"` : 'Restaurantes populares'}
        </SectionTitle>
        <Grid>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((r) => (
              <Card key={r.id} onClick={() => navigate(`/restaurant/${r.id}`)}>
                <RestaurantName>{r.name}</RestaurantName>
                <RestaurantInfo>{r.category} • ⭐ {r.rating}</RestaurantInfo>
              </Card>
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
              Nenhum restaurante encontrado
            </p>
          )}
        </Grid>
      </RestaurantsSection>
    </Wrapper>
  )
}
