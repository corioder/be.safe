<template>
  <div class="boxes">
    <div class="homeBoxes" v-if="isHome">
      <box v-for="category in $store.getters.getCategoriesForHome" :key="`${category.name}boxHome`" :data="category" />
      <boxButton @click.native="$router.push('/aware')" />
    </div>
    <div class="awareBoxes" v-else>
      <box v-for="category in $store.state.categories" :key="`${category.name}boxHome`" :data="category" />
    </div>
  </div>
</template>

<script>
  import box from './box.vue';
  import boxButton from './boxButton.vue';

  export default {
    name: 'boxes',

    components: {
      box,
      boxButton,
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
  @import '../../scss/mixins/_flex.scss';
  @import '../../scss/mixins/_grid.scss';
  .boxes {
    margin: 0;
    @include flex(column);
    .homeBoxes,
    .awareBoxes {
      @include grid(1);
      grid-gap: 64px;
      margin-bottom: 64px;
    }
  }

  @media (min-width: 768px) {
    .boxes {
      .awareBoxes,
      .homeBoxes {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @media (min-width: 1024px) {
    .boxes {
      .awareBoxes,
      .homeBoxes {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
</style>
