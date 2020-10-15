<template>
  <div class="boxes">
    <statsBox allCases="" newCases="" />
  </div>
</template>

<script>
import statsBox from "./statsBox.vue";
export default {
  name: "boxes",

  components: {
    statsBox,
  },
};
</script>

<style>
</style>