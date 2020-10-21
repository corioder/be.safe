<template>
  <div class="articlePreview" @click="$router.push(`/preventive/${article.id}`)">
    <div class="photo" :style="{ backgroundImage: `url(${$store.state.APIS.STRAPI + article.mainphoto.url})` }" alt="" />
    <div>
      <p>{{ article.date }}</p>
      <h2>{{ article.title }}</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'articlePreview',
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/_flex.scss';
  @import '../scss/vars/_colors.scss';
  .articlePreview {
    margin-top: 20px;
    @include flex;
    color: $richBlack;
    .photo {
      width: 100px;
      height: 100px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    div {
      margin-left: 12px;
      @include flex(column, flex-start);
      p {
        font-weight: 300;
      }
    }
  }
</style>
