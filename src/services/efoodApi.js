const API_URL = 'https://api-ebac.vercel.app/api/efood/restaurantes'

export async function getRestaurants() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar os restaurantes.')
  }

  return response.json()
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
