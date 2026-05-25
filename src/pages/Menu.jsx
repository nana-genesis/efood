import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`

const Item = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`

export default function Menu() {
  return (
    <div>
      <h2>Menu</h2>
      <Grid>
        <Item>
          <h3>Pizza</h3>
          <p>Delicious cheese pizza</p>
        </Item>
        <Item>
          <h3>Burger</h3>
          <p>Classic beef burger</p>
        </Item>
        <Item>
          <h3>Sushi</h3>
          <p>Fresh rolls</p>
        </Item>
      </Grid>
    </div>
  )
}
