import { Routes, Route, Link } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/Home'
import Menu from './pages/Menu'

const GlobalStyle = createGlobalStyle`
  body { margin: 0; font-family: Inter, system-ui, Arial, sans-serif; }
  a { text-decoration: none; color: inherit; }
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Header = styled.header`
  background: #ff5a5f;
  color: white;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Container = styled.main`
  flex: 1;
  padding: 24px;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header>
          <h1>efood</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/menu">Menu</Link>
          </nav>
        </Header>

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </Container>

        <footer style={{ padding: 16, textAlign: 'center' }}>© efood</footer>
      </Layout>
    </>
  )
}

export default App
