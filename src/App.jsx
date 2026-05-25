import { Routes, Route, Link } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Restaurant from './pages/Restaurant'
import Cart from './pages/Cart'
import Header from './components/Header'
import { CartProvider } from './context/CartContext'

const GlobalStyle = createGlobalStyle`
  :root{
    --bg: #fafafa;
    --surface: #ffffff;
    --primary: #ff5a5f;
    --accent: #00b894;
    --muted: #666666;
    --max-width: 1100px;
  }
  *{box-sizing: border-box}
  body { margin: 0; font-family: 'Inter', system-ui, Arial, sans-serif; background: var(--bg); color: #222 }
  a { text-decoration: none; color: inherit; }
  main{ max-width: var(--max-width); margin: 0 auto; }
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

// Header component is provided in src/components/Header.jsx
const Container = styled.main`
  flex: 1;
  padding: 24px;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <CartProvider>
          <Header />

          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Container>

          <footer style={{ padding: 16, textAlign: 'center' }}>© efood</footer>
        </CartProvider>
      </Layout>
    </>
  )
}

export default App
