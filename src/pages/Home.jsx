import styled from 'styled-components'

const Hero = styled.section`
  display: flex;
  gap: 24px;
  align-items: center;
`

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
`

export default function Home() {
  return (
    <div>
      <Hero>
        <Card>
          <h2>Welcome to efood</h2>
          <p>Explore restaurants and order your favorite meals.</p>
        </Card>
      </Hero>
    </div>
  )
}
