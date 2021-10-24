const Aquarium = () => {
  return import('@plop/examples-aquarium')
}

const RPG = () => {
  return import('@plop/examples-rpg')
}

const BitmaskTiles = () => {
  return import('@plop/examples-bitmask-tiles')
}

export const routes = [
  {
    path: '/aquarium',
    component: Aquarium
  },
  {
    path: '/rpg',
    component: RPG
  },
  {
    path: '/bitmask-tiles',
    component: BitmaskTiles
  },
  {
    path: '*',
    component: Aquarium
  }
]
