const restaurants = [
  {
    id: 'r1',
    name: 'Casa da Pizza',
    category: 'Pizza',
    rating: 4.7,
    description: 'Pizzas artesanais com ingredientes selecionados.',
    items: [
      { id: 'p1', name: 'Margherita', price: 32 },
      { id: 'p2', name: 'Pepperoni', price: 38 },
    ],
  },
  {
    id: 'r2',
    name: 'Burguer House',
    category: 'Burgers',
    rating: 4.6,
    description: 'Burgers suculentos preparados na chapa.',
    items: [
      { id: 'p3', name: 'Classic Burger', price: 28 },
      { id: 'p4', name: 'Cheese Bacon', price: 34 },
    ],
  },
  {
    id: 'r3',
    name: 'Sushi Spot',
    category: 'Sushi',
    rating: 4.8,
    description: 'Rolos frescos e combinados especiais.',
    items: [
      { id: 'p5', name: 'California Roll', price: 26 },
      { id: 'p6', name: 'Salmon Nigiri', price: 30 },
    ],
  },
]

export default restaurants
