<template>
  <div class="loading">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <h1>{{ errorMessage }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data() {
      return {
        errorMessage:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio temporibus veritatis, natus, nobis ab sunt cum aliquid tenetur quod, neque dicta? Doloremque animi impedit ipsam in eum exercitationem dicta est!',
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/components/_loading.scss';
  @import '../scss/mixins/_flex.scss';
  .loading {
    @include flex(column);
    justify-content: center;
    // height: calc(100vh - 120px);
    height: 100vh;
    h1 {
      font-size: 24px;
      text-align: center;
    }
  }
</style>
