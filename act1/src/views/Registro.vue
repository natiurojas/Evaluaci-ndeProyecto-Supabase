<script setup>
import { ref } from 'vue'
import { supabase } from '@/Supabase.js'

const correo = ref('')
const clave = ref('')
const conClave = ref('')

const cargando = ref(false)
const mensaje = ref('')
const registroExitoso = ref(false)

async function registrarUsuario() {
  mensaje.value = ''
  registroExitoso.value = false

  if (clave.value !== conClave.value) {
    mensaje.value = 'Las contraseñas no coinciden'
    return
  }

  if (clave.value.length < 6) {
    mensaje.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  cargando.value = true

  try {
    const { error } = await supabase.auth.signUp({
      email: correo.value,
      password: clave.value,
    })

    if (error) throw error

    registroExitoso.value = true
    mensaje.value = 'Registro exitoso. Revisá tu correo para confirmar la cuenta.'

    correo.value = ''
    clave.value = ''
    conClave.value = ''
  } catch (error) {
    mensaje.value = error.message
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <section class="card">
    <h1>Crear cuenta</h1>
    <p class="descripcion">Registrate para hacer pedidos y ver el estado de tus piezas.</p>

    <form @submit.prevent="registrarUsuario">
      <div class="campo">
        <label for="correo">Correo</label>
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
        <label for="clave">Contraseña</label>
        <input
          id="clave"
          v-model="clave"
          type="password"
          placeholder="Mínimo 6 caracteres"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="campo">
        <label for="conClave">Repetir contraseña</label>
        <input
          id="conClave"
          v-model="conClave"
          type="password"
          placeholder="Volvé a escribir la contraseña"
          autocomplete="new-password"
          required
        />
      </div>

      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Registrando...' : 'Registrarme' }}
      </button>
    </form>

    <p v-if="mensaje" :class="registroExitoso ? 'exito' : 'error'">{{ mensaje }}</p>

    <p class="enlace-login">
      ¿Ya tenés cuenta?
      <router-link to="/login">Ingresá</router-link>
    </p>
  </section>
</template>

<style scoped>
.card {
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

.enlace-login {
  margin-top: 18px;
  font-size: 14px;
  color: #6b7280;
}

.enlace-login a {
  color: #2563eb;
  font-weight: 600;
}
</style>