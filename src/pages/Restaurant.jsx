import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatchCart } from '../context/CartContext'
import { formatCurrency, getRestaurants } from '../services/efoodApi'

const Layout = styled.div`
  display: grid;
  gap: 26px;
`

const Hero = styled.section`
  min-height: 340px;
  display: flex;
  align-items: end;
  padding: 34px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background:
    linear-gradient(to top, rgba(9, 7, 16, 0.96), rgba(9, 7, 16, 0.24)),
    url(${({ $image }) => $image});
  background-position: center;
  background-size: cover;
  box-shadow: var(--shadow);

  h1 {
    max-width: 780px;
    margin: 8px 0 10px;
    color: #fff;
    font-size: clamp(34px, 6vw, 64px);
    line-height: 1;
    text-transform: uppercase;
    text-shadow: 3px 3px 0 rgba(0, 229, 255, 0.32);
  }

  p {
    max-width: 760px;
    margin: 0;
    color: var(--muted);
  }

  @media (max-width: 640px) {
    min-height: 280px;
    padding: 24px;
  }
`

const HeroInfo = styled.div`
  position: relative;
  z-index: 1;
`

const BackLink = styled(Link)`
  color: var(--accent);
  font-weight: 800;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`

const Tag = styled.span`
  color: ${({ $accent }) => ($accent ? 'var(--ink)' : '#fff')};
  padding: 6px 9px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  background: ${({ $accent }) => ($accent ? 'var(--lime)' : 'rgba(255, 47, 114, 0.86)')};
`

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 30px;
  }

  p {
    margin: 0;
    color: var(--muted);
  }

  @media (max-width: 620px) {
    align-items: start;
    flex-direction: column;
  }
`

const DishGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
`

const DishCard = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--card);
`

const DishImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`

const DishBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 14px;

  h3 {
    margin: 0 0 8px;
    font-size: 20px;
  }

  p {
    color: var(--muted);
  }
`

const Price = styled.strong`
  display: block;
  margin: 12px 0;
  color: var(--lime);
  font-size: 18px;
`

const CTA = styled.button`
  min-height: 42px;
  margin-top: auto;
  padding: 0 14px;
  border-radius: 8px;
  color: var(--ink);
  cursor: pointer;
  font-weight: 900;
  background: linear-gradient(135deg, var(--accent), var(--lime));

  &:hover {
    filter: brightness(1.08);
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgba(5, 4, 10, 0.78);
  backdrop-filter: blur(10px);
`

const Modal = styled.div`
  width: min(100%, 880px);
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 20px;
  padding: 18px;
  border: 1px solid rgba(0, 229, 255, 0.32);
  border-radius: 8px;
  position: relative;
  background: linear-gradient(145deg, rgba(17, 12, 29, 0.98), rgba(30, 17, 44, 0.98));
  box-shadow: 0 0 44px rgba(0, 229, 255, 0.16), var(--shadow);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    max-height: calc(100vh - 36px);
    overflow: auto;
  }
`

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
  border-radius: 6px;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  h2 {
    margin: 0 36px 10px 0;
    font-size: 28px;
  }

  p {
    color: var(--muted);
  }
`

const Close = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  background: rgba(255, 255, 255, 0.1);
`

const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-top: auto;
  padding-top: 18px;
`

const Secondary = styled.button`
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.08);
`

const Message = styled.p`
  color: var(--muted);
`

export default function Restaurant() {
  const { id } = useParams()
  const dispatch = useDispatchCart()
  const [restaurant, setRestaurant] = useState(null)
  const [selectedDish, setSelectedDish] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    getRestaurants()
      .then((restaurants) => {
        const foundRestaurant = restaurants.find((item) => String(item.id) === id)
        setRestaurant(foundRestaurant)
        setStatus(foundRestaurant ? 'success' : 'missing')
      })
      .catch(() => setStatus('error'))
  }, [id])

  useEffect(() => {
    if (!selectedDish) return

    function onKeyDown(event) {
      if (event.key === 'Escape') setSelectedDish(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedDish])

  function addToCart(dish) {
    dispatch({
      type: 'add',
      item: {
        id: dish.id,
        name: dish.nome,
        price: dish.preco,
        image: dish.foto,
      },
    })
    setSelectedDish(null)
  }

  if (status === 'loading') return <Message>Carregando restaurante...</Message>
  if (status === 'error') return <Message>Nao foi possivel carregar este restaurante.</Message>
  if (status === 'missing') return <Message>Restaurante nao encontrado.</Message>

  return (
    <Layout>
      <Hero $image={restaurant.capa}>
        <HeroInfo>
          <Tags>
            {restaurant.destacado && <Tag $accent>Destaque</Tag>}
            <Tag>{restaurant.tipo}</Tag>
            <Tag>Nota {restaurant.avaliacao}</Tag>
          </Tags>
          <h1>{restaurant.titulo}</h1>
          <p>{restaurant.descricao}</p>
        </HeroInfo>
      </Hero>

      <MenuHeader>
        <div>
          <h2>Cardapio</h2>
          <p>Clique em comprar o produto para conferir detalhes antes de adicionar ao carrinho.</p>
        </div>
        <BackLink to="/menu">Voltar aos restaurantes</BackLink>
      </MenuHeader>

      <DishGrid>
        {restaurant.cardapio.map((dish) => (
          <DishCard key={dish.id}>
            <DishImage src={dish.foto} alt={dish.nome} />
            <DishBody>
              <h3>{dish.nome}</h3>
              <p>{dish.descricao}</p>
              <Price>{formatCurrency(dish.preco)}</Price>
              <CTA onClick={() => setSelectedDish(dish)}>Comprar o produto</CTA>
            </DishBody>
          </DishCard>
        ))}
      </DishGrid>

      {selectedDish && (
        <Overlay onMouseDown={() => setSelectedDish(null)}>
          <Modal role="dialog" aria-modal="true" aria-labelledby="dish-title" onMouseDown={(event) => event.stopPropagation()}>
            <Close aria-label="Fechar modal" onClick={() => setSelectedDish(null)}>x</Close>
            <ModalImage src={selectedDish.foto} alt={selectedDish.nome} />
            <ModalContent>
              <h2 id="dish-title">{selectedDish.nome}</h2>
              <p>{selectedDish.descricao}</p>
              <Price>{formatCurrency(selectedDish.preco)}</Price>
              <p>Serve: {selectedDish.porcao}</p>
              <ModalActions>
                <CTA onClick={() => addToCart(selectedDish)}>
                  Adicionar ao carrinho - {formatCurrency(selectedDish.preco)}
                </CTA>
                <Secondary onClick={() => setSelectedDish(null)}>Continuar vendo</Secondary>
              </ModalActions>
            </ModalContent>
          </Modal>
        </Overlay>
      )}
    </Layout>
  )
}
