import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Contacto from '@/views/Contacto.vue'
import Registro from '@/views/Registro.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/Contacto', name: 'contacto', component: Contacto },
  { path: '/Registro', name: 'registro', component: Registro },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router