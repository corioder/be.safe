<template>
  <div class="aware">
    <div v-for="day in perday" :key="day._id">{{ day.confirmed }}</div>
  </div>
</template>

<script>
export default {
  name: 'aware',
  data() {
    return {
      perday: [],
    };
  },
  mounted() {
    fetch(this.$store.state.urls.API + 'perday')
      .then((response) => response.json())
      .then((data) => (this.perday = data))
      .then(() => (this.today = this.perday[this.perday.length - 1]))
      .then(() => console.log(this.perday))
      .catch((error) => console.error(error));
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/mixins/_flex.scss';
.aware {
  @include flex(column);
  width: calc(100vw - 25px);
}
</style>
