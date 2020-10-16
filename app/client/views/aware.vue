<template>
  <div class="aware">
    <boxes />
  </div>
</template>

<script>
  import boxes from '../components/boxes.vue';

  export default {
    name: 'aware',
    components: {
      boxes,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .aware {
    @include flex(column);
    width: 100vw;
  }
</style>
