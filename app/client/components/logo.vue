<template>
  <div :style="bg">
    <p>
      be.<span>{{ text }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "logo",
  props: {
    text: {
      required: true,
      type: String,
    },
  },
  computed: {
    bg() {
      let color;
      switch (this.text) {
        case "safe":
          color = "#72A1E5";
          break;
        case "informed":
          color = "#FF850A";
          break;
        case "aware":
          color = "#E94F37";
          break;
        case "aware":
          color = "#E94F37";
          break;
        case "protected":
          color = "#888DA7";
          break;
        default:
          color = "#72A1E5";
          break;
      }
      return {
        "--bg": color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  --bg: #72a1e5;
  p {
    font-size: 24px;
    color: #011627;
    position: relative;
    span {
      color: #fdfffc;
    }
    span::before {
      content: "";
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
}
</style>