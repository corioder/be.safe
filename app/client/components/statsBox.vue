<template>
  <div class="statsBox">
    <p class="positive">{{ data.name }}</p>
  </div>
</template>

<script>
  export default {
    name: 'statsBox',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  @import '../scss/vars/_colors.scss';
  .statsBox {
    margin: 0;
    margin-bottom: 20px;
    width: calc(100vw - 24px);
    max-width: 400px;
    // width: 50px;
    border-radius: 10px;
    background-color: #fff;
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    @include flex(column);
    p {
      width: 100%;
      text-align: center;
      font-weight: 600;
      color: $richBlack;
    }
  }
</style>
