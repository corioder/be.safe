<template>
  <div class="aware">
    <!-- <boxes /> -->
    <charts />
  </div>
</template>

<script>
  import boxes from '../components/boxes.vue';
  import charts from '../components/charts.vue';

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
  .aware {
    @include flex(column);
  }
</style>
