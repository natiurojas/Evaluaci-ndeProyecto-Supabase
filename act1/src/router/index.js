import { createRouter, createWebHistory } from 'vue-router'
import {supabase} from '@/Supabase'
import Home from '@/views/Home.vue'
import Contacto from '@/views/Contacto.vue'
import Registro from '@/views/Registro.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: 'login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: InicioView,
      meta: {
        requiereAutenticacion: true,
    }
    router.beforeEach(async (destino)=> {
      const {
        data: {session},
      } = await supabase.auth.getSession()
      if (destino.meta.requiereAutenticacion && !session){
        return '/login'
      }
      if (
        session &&
        (destino.path === '/registro')
      ){
        return '/inicio'
    })
  ]
})
