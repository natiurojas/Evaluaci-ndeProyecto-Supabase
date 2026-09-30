<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
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