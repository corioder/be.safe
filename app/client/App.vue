<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    created() {
      console.log(`test`);
    },
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  * {
    font-family: 'Open Sans', sans-serif;
    box-sizing: border-box;
  }
</style>
