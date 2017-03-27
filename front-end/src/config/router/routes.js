import Index from '../../components/pages/Index.vue'
import detailpage from '../../components/pages/details.vue'

export const routes = [
  { path: '/', component: Index, name: "Página Inicial" },
  { path: '/details/:ticket', component: detailpage, name: "Detalhes", props: true }
]
