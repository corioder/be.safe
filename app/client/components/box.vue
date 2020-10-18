<template>
  <div class="box">
    <p :class="[data.isPositive ? 'positive' : 'negative', 'amount']">{{ data.amount }}</p>
    <p class="name">{{ data.name }}</p>
    <div class="row">
      <p class="amountOfNew"><span v-if="data.amountOfNew >= 0">+ </span>{{ data.amountOfNew }}</p>
      <p><span v-if="data.percentChange >= 0">+ </span>{{ data.percentChange }}%</p>
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
    @include flex(column);
    width: calc(100vw - 24px);
    max-width: 300px;
    // width: 50px;
    border-radius: 10px;
    // background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    p {
      text-align: center;
      font-weight: 600;
      color: $richBlack;

      display: inline-block;
      margin: 0;
      margin: 8px 0 8px 0;
      font-size: 14px;
    }
    .name {
      margin-top: -8px;
    }
    .amount {
      margin-bottom: 0;
      font-size: 52px;
      font-weight: 600;
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
      font-size: 12px;
      .amountOfNew {
        margin-right: 15px;
      }
    }
  }
</style>
