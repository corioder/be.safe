<template>
  <div class="proactive">
    <articlePreview v-for="article in $store.state.articles" :articleData="article" :key="`article_${article.id}_preview`" />
  </div>
</template>

<script>
  import articlePreview from '../components/articlePreview.vue';
  export default {
    name: 'proactive',
    components: {
      articlePreview,
    },
  };
</script>

<style lang="scss" scoped></style>
