<template>
  <div class="home"><h1>Coming Soon</h1></div>
</template>

<script>
  export default {
    name: 'home',
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .home {
    @include flex(column);
    h1 {
      margin-top: 64px;
    }
  }
</style>
