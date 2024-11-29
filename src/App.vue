<template>
  <div id="app">
      <header>
          <h1>{{ headerTitle }}</h1>
          <button @click="toggleManagment">{{ toggleButtonText }}</button><br><br>
      </header>
      <router-view></router-view> 
  </div>
</template>

<script>

export default {
  computed: {
    headerTitle() {
      return this.$route.path === '/products' ? 'Управление продуктами' : 'Управление клиентами';
    },
    toggleButtonText() {
      return this.$route.path === '/products' ? 'Управление клиентами' : 'Управление продуктами';
    }
  },
  methods: {
    toggleManagment() {
      const newPath = this.$route.path === '/products' ? '/clients' : '/products';
      this.$router.push(newPath);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
nav {
    margin-top: 10px;
}
nav a {
    margin-right: 15px;
    text-decoration: none;
    color: blue;
}
nav a.router-link-exact-active {
    font-weight: bold; 
}
</style>
