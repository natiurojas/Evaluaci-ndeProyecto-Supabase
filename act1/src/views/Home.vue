<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/Supabase.js'

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

    if (error) throw error

    router.push('/login')
  } catch (error) {
    alert(error.message)
  } finally {
    cerrandoSesion.value = false
  }
}
</script>

<template>
  <section class="hero">
    <div class="icono">✓</div>
    <h1>¡Bienvenido!</h1>
    <p>Iniciaste sesión correctamente</p>

    <div class="datos-usuario">
      <span>Usuario Autenticado</span>
      <strong>{{ correoUsuario }}</strong>
    </div>

    <button type="button" :disabled="cerrandoSesion" @click="cerrarSesion">
      {{ cerrandoSesion ? 'Cerrando...' : 'Cerrar sesión' }}
    </button>
  </section>
</template>

<style scoped>
.hero {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 40px 32px;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

.icono {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #dcfce7;
  color: #15803d;
  font-size: 28px;
  line-height: 56px;
}

h1 {
  font-size: 28px;
  margin-bottom: 8px;
}

p {
  color: #6b7280;
  margin-bottom: 24px;
}

.datos-usuario {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.datos-usuario span {
  font-size: 13px;
  color: #6b7280;
}

.datos-usuario strong {
  font-size: 16px;
  word-break: break-all;
}

button {
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 24px;
  font-weight: 600;
}

button:disabled {
  background: #fca5a5;
  cursor: not-allowed;
}
</style>