<template>
  <div class="aware">
    <boxes />
  </div>
</template>

<script>
  import boxes from '../components/boxes.vue';
  import chart from '../components/chart.vue';

  export default {
    name: 'aware',
    components: {
      boxes,
      chart,
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
