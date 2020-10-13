<template>
  <div class="home"><logo text="safe" /></div>
</template>

<script>
import logo from "../components/logo.vue";
export default {
  name: "home",
  components: {
    logo,
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins/_flex.scss";
.home {
  @include flex(column);
  h1 {
    margin-top: 64px;
  }
}
</style>
