<template>
  <div class="home">
    <boxes />
    <charts />
  </div>
</template>

<script>
  import boxes from '../components/boxes/boxes.vue';
  import charts from '../components/charts/charts.vue';

  export default {
    name: 'home',
    components: {
      boxes,
      charts,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .home {
    margin-top: 32px;
    @include flex(column);
  }
</style>
