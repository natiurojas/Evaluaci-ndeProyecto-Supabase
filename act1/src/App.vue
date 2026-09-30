<script setup></script>

<template>
  <header class="header">
    <router-link to="/" class="logo">Impresión 3D</router-link>

    <nav class="nav">
      <router-link to="/">Inicio</router-link>
      <router-link to="/Contacto">Contacto</router-link>
      <router-link to="/Registro">Registro</router-link>
    </nav>
  </header>

  <main class="main">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 24px;
  background: #111827;
  color: #fff;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 18px;
}

.nav a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 15px;
}

.nav a:hover,
.nav a.router-link-active {
  color: #fff;
}

.main {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 20px;
}
</style>