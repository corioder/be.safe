<template>
  <div class="box">
    <p class="name">{{ data.name }}</p>
    <p :class="[data.isPositive ? 'positive' : 'negative', 'amount']">{{ data.amount }}</p>
    <div class="row">
      <p :class="[(data.amountOfNew <= 0 && !data.isPositive) || (data.amountOfNew > 0 && data.isPositive) ? 'positive' : 'negative', 'amountOfNew']">
        <span v-if="data.amountOfNew >= 0">+ </span>{{ data.amountOfNew }}
      </p>
      <p :class="(data.percentChange <= 0 && !data.isPositive) || (data.percentChange > 0 && data.isPositive) ? 'positive' : 'negative'">
        <span v-if="data.percentChange >= 0">+ </span>{{ data.percentChange }}%
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'box',
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
  .box {
    margin: 0;
    margin-bottom: 50px;
    width: calc(100vw - 24px);
    max-width: 400px;
    // width: 50px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    @include flex(column);
    p {
      text-align: center;
      font-weight: 600;
      color: $richBlack;
      display: inline-block;
      margin: 0;
      margin: 8px 0 8px 0;
    }
    .name,
    .amount {
      width: 100%;
    }
    .positive {
      color: $shamrockGreen;
    }
    .negative {
      color: $cinnabar;
    }

    .row {
      @include flex;
      justify-content: center;
      width: 100%;
      .amountOfNew {
        margin-right: 15px;
      }
    }
  }
</style>
