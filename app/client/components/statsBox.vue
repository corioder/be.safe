<template>
  <div class="statsBox">
    <p>{{ allCases }}</p>
    <p>{{ newCases }}</p>
  </div>
</template>

<script>
export default {
  name: "statsBox",
  props: {
    allCases: {
      required: true,
    },
    newCases: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.statsBox {
  height: 78px;
  width: 296px;
  border-radius: 10px;
  background-color: #fefcff;
}
</style>