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
    --bg: #0a0612;
    --surface: rgba(18, 11, 31, 0.92);
    --card: rgba(20, 12, 35, 0.85);
    --primary: #ff3366;
    --primary-light: #ff4d7a;
    --accent: #00d4ff;
    --accent-light: #33e0ff;
    --muted: #a8a4c0;
    --text: #e8e4f3;
    --text-h: #ffffff;
    --border: rgba(255, 51, 102, 0.12);
    --max-width: 1100px;
  }
  *{
    box-sizing: border-box;
  }
  body {
    margin: 0;
    min-height: 100vh;
    color: var(--text);
    font-family: 'Inter', system-ui, Arial, sans-serif;
    background: linear-gradient(135deg, #0a0612 0%, #1a0f2e 50%, #0f1a2e 100%);
    background-attachment: fixed;
    line-height: 1.6;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  main {
    max-width: var(--max-width);
    margin: 0 auto;
    width: 100%;
  }
  h1, h2, h3, h4 {
    color: var(--text-h);
    font-weight: 700;
  }
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background: radial-gradient(circle at top center, rgba(255, 89, 163, 0.12), transparent 24%),
    radial-gradient(circle at right center, rgba(70, 240, 255, 0.08), transparent 25%);
`

// Header component is provided in src/components/Header.jsx
const Container = styled.main`
  flex: 1;
  padding: 28px;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 30px;
  background: rgba(12, 6, 26, 0.92);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
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

          <footer style={{ padding: 18, textAlign: 'center', color: 'rgba(255,255,255,0.75)', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 24 }}>© efood</footer>
        </CartProvider>
      </Layout>
    </>
  )
}

export default App
