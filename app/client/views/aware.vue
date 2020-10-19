<template>
  <div class="aware" :style="$store.state.isNavOpened ? 'z-index:-1; position: relative;' : 'z-index:0; position: initial;'">
    <boxes />
    <charts />
  </div>
</template>

<script>
  import boxes from '../components/boxes/boxes.vue';
  import charts from '../components/charts/charts.vue';

  export default {
    name: 'aware',
    components: {
      boxes,
      charts,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  @import '../scss/vars/_colors.scss';
  .aware {
    @include flex(column);
    background-color: $babyPowder;
  }
</style>
