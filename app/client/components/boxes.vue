<template>
  <div class="boxes">
    <div v-if="isHome">
      <box v-for="category in $store.getters.getCategoriesForHome" :key="`${category.name}boxHome`" :data="category" />
    </div>
    <div v-else>
      <box v-for="category in $store.state.categories" :key="`${category.name}boxHome`" :data="category" />
    </div>
  </div>
</template>

<script>
  import box from './box.vue';
  export default {
    name: 'boxes',

    components: {
      box,
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
  @import '../scss/mixins/_grid.scss';
  .boxes {
    // width: 100vw;
    margin: 0;
    @include flex(column);
    div {
      @include grid(1);
    }
  }
</style>
