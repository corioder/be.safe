<template>
  <p>
    be.<span :style="`background-color:${$store.getters.getColorByName(text)};`">{{ text }}</span>
  </p>
</template>

<script>
  export default {
    name: 'logo',
    props: {
      text: {
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  p {
    font-size: 24px;
    color: #011627;
    position: relative;
    margin: 0;
    display: inline;

    span {
      color: #fdfffc;
    }

    span::before {
      content: '';
      display: inline-block;
      width: calc(100% - 25px);
      height: 100%;
      position: absolute;
      right: -8px;
      top: 4px;
      z-index: -1;
    }
  }
</style>
