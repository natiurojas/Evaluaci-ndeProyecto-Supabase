import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/Supabase.js'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Registro from '@/views/Registro.vue'
import Contacto from '@/views/Contacto.vue'

const routes = [
  { path: '/', redirect: '/inicio' },
  { path: '/login', name: 'login', component: Login },
  { path: '/registro', name: 'registro', component: Registro },
  { path: '/contacto', name: 'contacto', component: Contacto },
  {
    path: '/inicio',
    name: 'inicio',
    component: Home,
    meta: { requiereAutenticacion: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (destino) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session && (destino.path === '/login' || destino.path === '/registro')) {
    return '/inicio'
  }

  if (destino.meta.requiereAutenticacion && !session) {
    return '/login'
  }
})

export default router