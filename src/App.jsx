import { Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Restaurant from './pages/Restaurant'
import Cart from './pages/Cart'
import Header from './components/Header'
import { CartProvider } from './context/CartContext'

const GlobalStyle = createGlobalStyle`
  :root{
    --bg: #090710;
    --surface: rgba(18, 14, 31, 0.92);
    --panel: rgba(24, 17, 38, 0.82);
    --card: rgba(25, 20, 42, 0.78);
    --primary: #ff2f72;
    --primary-strong: #ff005c;
    --accent: #00e5ff;
    --lime: #bcff2f;
    --muted: #b7b1cc;
    --text: #f6f2ff;
    --ink: #090710;
    --border: rgba(255, 255, 255, 0.12);
    --shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
    --max-width: 1100px;
  }
  *{
    box-sizing: border-box;
  }
  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    color: var(--text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background:
      linear-gradient(135deg, rgba(255, 47, 114, 0.18), transparent 26%),
      linear-gradient(230deg, rgba(0, 229, 255, 0.14), transparent 28%),
      radial-gradient(circle at 50% 0%, rgba(188, 255, 47, 0.08), transparent 24%),
      var(--bg);
    background-attachment: fixed;
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 78%);
  }
  button, input {
    font: inherit;
  }
  button {
    border: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  h1, h2, h3, h4, p {
    margin-top: 0;
  }
  img {
    max-width: 100%;
    display: block;
  }
  main{
    max-width: var(--max-width);
    margin: 0 auto;
    width: 100%;
  }
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`

const Container = styled.main`
  flex: 1;
  padding: 28px 20px 56px;

  @media (max-width: 700px) {
    padding-inline: 14px;
  }
`

const Footer = styled.footer`
  color: var(--muted);
  padding: 24px;
  text-align: center;
  border-top: 1px solid var(--border);
  background: rgba(9, 7, 16, 0.72);
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

          <Footer>© efood cyber delivery</Footer>
        </CartProvider>
      </Layout>
    </>
  )
}

export default App
