<template>
  <p :style="bg">
    be.<span>{{ text }}</span>
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
  mounted() {
    console.log(this.text);
  },
  computed: {
    bg() {
      const colors = {
        richBlack: '#011627',
        babyPowder: '#fdfffc',
        littleBoyBlue: '#72a1e5',
        cinnabar: '#e94f37',
        orange: '#ff850a',
        shamrockGreen: '#329f5b',
      };
      let color;
      switch (this.text) {
        case 'informed':
          color = colors.orange;
          break;
        case 'aware':
          color = colors.cinnabar;
          break;
        case 'proactive':
          color = colors.shamrockGreen;
          break;
        default:
          color = colors.littleBoyBlue;
          break;
      }
      return {
        '--bg': color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  --bg: #72a1e5;
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
    background-color: var(--bg);
    position: absolute;
    right: -8px;
    top: 4px;
    z-index: -1;
  }
}
</style>
