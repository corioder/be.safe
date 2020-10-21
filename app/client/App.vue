<template>
  <div id="app">
    <header v-if="$route.name != 'pageNotFound'">
      <div class="logoContainer"><logo :text="$route.name == 'home' ? 'safe' : $route.name" /></div>
      <navigation />
    </header>
    <router-view style="margin-top: 60px" />
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
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap');
  @import './scss/vars/_colors.scss';
  * {
    font-family: 'Open Sans', sans-serif;
    box-sizing: border-box;
  }
  html {
    background-color: $babyPowder;

    font-weight: 400;
  }
  body::-webkit-scrollbar {
    display: none;
  }

  header {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100vw;
    height: 60px;
    background-color: $babyPowder;
    .logoContainer {
      position: relative;
      left: 12px;
      top: 12px;
    }
  }
</style>
