<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
const router = useRouter()
const correoUsuario = ref('')
const cerrandoSesion = ref(false)
onMounted(async () => {
const {
data: { user },
} = await supabase.auth.getUser()
if (user) {
correoUsuario.value = user.email
}
})
async function cerrarSesion() {
try {
cerrandoSesion.value = true
const { error } = await supabase.auth.signOut()
if (error) {
throw error
}
router.push('/login')
} catch (error) {
alert(error.message)
} finally {
cerrandoSesion.value = false
}
}
</script>

<template>
  <main class="pagina-inicio">
<section class="tarjeta-inicio">
<div class="icono">✓</div>
  <section class="hero">
    <h1>¡Bienvenido!</h1>
    <p>Iniciaste sesión correctamente</p>
    <div class="datos-usuario">
      <span>Usuario Autenticado</span>
      <strong>{{ correoUsuario }}</strong>
</div>
<button
type="button"
:disabled="cerrandoSesion"
@click="cerrarSesion"
>
{{ cerrandoSesion ? 'Cerrando...' : 'Cerrar sesión' }}
</button>
</section>
</main>
</template>
      <router-link to="/Registro" class="boton">Crear cuenta</router-link>
      <router-link to="/Contacto" class="boton secundario">Contactanos</router-link>
    </div>
  </section>

  <section class="tarjetas">
    <article class="tarjeta">
      <h3>Diseñá tu pieza</h3>
      <p>Subí tu archivo STL o 3D y lo revisamos antes de imprimir.</p>
    </article>
    <article class="tarjeta">
      <h3>Elegí el material</h3>
      <p>PLA, ABS, PETG o resina, según lo que necesites.</p>
    </article>
    <article class="tarjeta">
      <h3>Recibí tu pedido</h3>
      <p>Te avisamos por WhatsApp cuando esté lista para retirar.</p>
    </article>
  </section>
</template>

<style scoped>
.hero {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 40px 32px;
  text-align: center;
}

.hero h1 {
  font-size: 34px;
  margin-bottom: 10px;
}

.hero p {
  color: #6b7280;
  margin-bottom: 24px;
}

.acciones {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.boton {
  background: #2563eb;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
}

.boton.secundario {
  background: #e5e7eb;
  color: #1f2937;
}

.tarjetas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.tarjeta {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}

.tarjeta h3 {
  margin-bottom: 8px;
  font-size: 17px;
}

.tarjeta p {
  color: #6b7280;
  font-size: 15px;
}
</style>