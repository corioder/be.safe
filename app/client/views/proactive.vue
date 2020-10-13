<template>
  <div class="proactive">
    <header>
      <div class="logoContainer"><logo text="proactive" /></div>
      <navigation />
    </header>
  </div>
</template>

<script>
  import logo from '../components/logo.vue';
  import navigation from '../components/navigation.vue';

  export default {
    name: 'proactive',
    components: {
      logo,
      navigation,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .proactive {
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
