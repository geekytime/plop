const Aquarium = () => {
  return import('@plop/examples-aquarium')
}

const RPG = () => {
  return import('@plop/examples-rpg')
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
    path: '*',
    component: Aquarium
  }
]
