const Aquarium = () => {
  return import('../src-aquarium/aquarium.vue')
}

const RPG = () => {
  return import('../src-rpg/rpg.vue')
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
