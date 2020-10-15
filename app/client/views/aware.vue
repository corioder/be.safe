<template>
  <div class="aware">
    <div v-for="day in perday" :key="day._id">{{ day.confirmed }}</div>
  </div>
</template>

<script>
export default {
  name: "aware",
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins/_flex.scss";
.aware {
  @include flex(column);
  width: calc(100vw - 25px);
}
</style>
