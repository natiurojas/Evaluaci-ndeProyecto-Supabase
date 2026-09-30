<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/Supabase.js'
const router = useRouter()
const correo = ref('')
const contrasena = ref('')
const cargando = ref(false)
const mensaje = ref('')
const inicioExitoso = ref(false)
async function iniciarSesion() {
mensaje.value = ''
inicioExitoso.value = false
try {
cargando.value = true
const { error } = await supabase.auth.signInWithPassword({
email: correo.value,
password: contrasena.value,
})
if (error) {
throw error
}
inicioExitoso.value = true
mensaje.value = 'Inicio de sesión correcto.'
router.push('/inicio')
} catch (error) {
if (error.message === 'Invalid login credentials') {
mensaje.value = 'El correo o la contraseña son incorrectos.'
} else if (error.message === 'Email not confirmed') {
mensaje.value = 'Primero tenés que confirmar tu correo electrónico.'
} else {
mensaje.value = error.message
}
} finally {
cargando.value = false
}
}
</script>
<template>
  <section class="tarjeta-login">
<h1>Iniciar sesión</h1>
<p class="descripcion">
Ingresá con tu correo electrónico y contraseña.
</p>
<form @submit.prevent="iniciarSesion">
<div class="campo">
<label for="correo">Correo electrónico</label>
<input
id="correo"
v-model="correo"
type="email"
placeholder="nombre@correo.com"
autocomplete="email"
required
/>
</div>
<div class="campo">
<label for="contrasena">Contraseña</label>
<input
id="contrasena"
v-model="contrasena"
type="password"
placeholder="Ingresá tu contraseña"
autocomplete="current-password"
required
/>
</div>
<button type="submit" :disabled="cargando">
{{ cargando ? 'Ingresando...' : 'Ingresar' }}
</button>
</form>
<p
v-if="mensaje"
class="mensaje"
:class="{ exito: inicioExitoso, error: !inicioExitoso }"
>
{{ mensaje }}
</p>
<p class="enlace-registro">
¿Todavía no tenés una cuenta?
<RouterLink to="/registro">
Registrate
</RouterLink>
</p>
  </section>
</template>

<style scoped>
.tarjeta-login {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 28px;
  max-width: 480px;
  margin: 0 auto;
}

h1 {
  font-size: 26px;
  margin-bottom: 6px;
}

.descripcion {
  color: #6b7280;
  font-size: 15px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 14px;
  font-weight: 600;
}

input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

input:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
}

button {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px;
  font-weight: 600;
}

button:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.exito {
  margin-top: 16px;
  color: #15803d;
  font-size: 15px;
}

.error {
  margin-top: 16px;
  color: #b91c1c;
  font-size: 15px;
}

.enlace-registro {
  margin-top: 18px;
  font-size: 14px;
  color: #6b7280;
}

.enlace-registro a {
  color: #2563eb;
  font-weight: 600;
}
</style>