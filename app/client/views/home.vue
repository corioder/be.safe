<template>
  <div class="home">
    <boxes />
  </div>
</template>

<script>
  import boxes from '../components/boxes.vue';
  export default {
    name: 'home',
    components: {
      boxes,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .home {
    @include flex(column);
    width: 100vw;
  }
</style>
