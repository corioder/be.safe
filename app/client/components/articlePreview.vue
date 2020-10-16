<template>
  <div class="articlePreview">
    <div class="photo" :style="{ backgroundImage: `url(${$store.state.APIS.STRAPI + articleData.Photo.url})` }" alt="" />
    <h3>{{ articleData.Title }}</h3>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      articleData: {
        type: Object,
        required: true,
      },
    },
    created() {
      console.log(this.articleData.Photo);
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  .articlePreview {
    margin-top: 20px;
    @include flex(column);
    .photo {
      width: 200px;
      height: 100px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      h3 {
        font-weight: 800;
      }
    }
  }
</style>
