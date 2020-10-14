<template>
  <div id="app">
    <header>
      <div class="logoContainer"><logo :text="$route.name == 'home' ? 'safe' : $route.name" /></div>
      <navigation />
    </header>
    <router-view />
  </div>
</template>

<script>
  import logo from './components/logo.vue';
  import navigation from './components/navigation.vue';
  export default {
    name: 'App',
    components: {
      logo,
      navigation,
    },
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  * {
    font-family: 'Open Sans', sans-serif;
    box-sizing: border-box;
  }

  header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    .logoContainer {
      position: relative;
      left: 12px;
      top: 12px;
    }
  }
</style>
