<template>
  <div class="informed">
    <header>
      <div class="logoContainer"><logo text="informed" /></div>
      <navigation />
    </header>
  </div>
</template>

<script>
  import logo from '../components/logo.vue';
  import navigation from '../components/navigation.vue';

  export default {
    name: 'informed',
    components: {
      logo,
      navigation,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .informed {
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
    // @include flex(column);
  }
</style>
