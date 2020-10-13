<template>
  <div class="home">
    <header>
      <div class="logoContainer"><logo text="safe" /></div>
      <nav><hamburger /></nav>
    </header>
  </div>
</template>

<script>
  import logo from '../components/logo.vue';
  import hamburger from '../components/hamburger.vue';
  export default {
    name: 'home',
    components: {
      logo,
      hamburger,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .home {
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
      nav {
        position: absolute;
        top: 10px;
        right: 12px;
      }
    }
    @include flex(column);
  }
</style>
