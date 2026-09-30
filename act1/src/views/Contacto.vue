<script setup>
import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
const mensaje = ref('')

const enviado = ref(false)

function enviar() {
  if (!nombre.value || !correo.value || !mensaje.value) return
  enviado.value = true
  nombre.value = ''
  correo.value = ''
  mensaje.value = ''
}
</script>

<template>
  <section class="card">
    <h1>Contacto</h1>
    <p class="sub">Escribinos y te respondemos dentro de las próximas 24 horas.</p>

    <form @submit.prevent="enviar">
      <label>
        Nombre
        <input v-model="nombre" type="text" placeholder="Tu nombre" required />
      </label>

      <label>
        Correo
        <input v-model="correo" type="email" placeholder="tucorreo@mail.com" required />
      </label>

      <label>
        Mensaje
        <textarea v-model="mensaje" rows="4" placeholder="¿Qué necesitás?" required></textarea>
      </label>

      <button type="submit">Enviar</button>
    </form>

    <p v-if="enviado" class="ok">¡Mensaje enviado! Te contactamos pronto.</p>
  </section>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 28px;
  max-width: 480px;
}

h1 {
  font-size: 26px;
  margin-bottom: 6px;
}

.sub {
  color: #6b7280;
  font-size: 15px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}

input,
textarea {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-weight: 400;
}

input:focus,
textarea:focus {
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

.ok {
  margin-top: 16px;
  color: #15803d;
  font-size: 15px;
}
</style>