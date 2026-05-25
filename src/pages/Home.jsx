import styled from 'styled-components'
import heroImg from '../assets/hero.png'

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 32px;
  align-items: center;
  padding: 40px 0;
`

const Left = styled.div``

const Title = styled.h2`
  font-size: 36px;
  margin: 0 0 12px 0;
`

const Subtitle = styled.p`
  margin: 0 0 20px 0;
  color: #444;
`

const Search = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
`

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
`

const CTA = styled.button`
  background: #ff5a5f;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
`

const Right = styled.div`
  display: flex;
  justify-content: center;
`

const HeroImage = styled.img`
  width: 100%;
  max-width: 360px;
  border-radius: 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 28px;
`

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.04);
`

export default function Home() {
  return (
    <Wrapper>
      <Hero>
        <Left>
          <Title>Peça comida rápida e gostosa</Title>
          <Subtitle>Encontre restaurantes perto de você e receba em casa.</Subtitle>

          <Search>
            <Input placeholder="Busque restaurantes, comidas ou pratos" />
            <CTA>Pesquisar</CTA>
          </Search>

          <CTA style={{ background: '#00b894' }}>Ver restaurantes</CTA>
        </Left>

        <Right>
          <HeroImage src={heroImg} alt="hero" />
        </Right>
      </Hero>

      <h3>Restaurantes populares</h3>
      <Grid>
        <Card>
          <h4>Casa da Pizza</h4>
          <p>Pizza, Italian • 4.7</p>
        </Card>
        <Card>
          <h4>Burguer House</h4>
          <p>Burgers • 4.6</p>
        </Card>
        <Card>
          <h4>Sushi Spot</h4>
          <p>Sushi • 4.8</p>
        </Card>
      </Grid>
    </Wrapper>
  )
}
