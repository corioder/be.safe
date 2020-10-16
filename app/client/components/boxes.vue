<template>
  <div class="boxes">
    <div v-if="isHome">
      <statsBox v-for="category in $store.getters.getCategoriesForHome" :key="`${category.name}StatsBoxHome`" :data="category" />
    </div>
    <div v-else>
      <statsBox v-for="category in $store.state.categories" :key="`${category.name}StatsBoxHome`" :data="category" />
    </div>
  </div>
</template>

<script>
  import statsBox from './statsBox.vue';
  export default {
    name: 'boxes',

    components: {
      statsBox,
    },
    data() {
      return {
        isHome: undefined,
      };
    },
    created() {
      if (this.$route.name == 'aware') this.isHome = false;
      else this.isHome = true;
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .boxes {
    // width: 100vw;
    margin: 0;
    @include flex(column);
  }
</style>
