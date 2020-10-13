<template>
  <nav>
    <button class="hamburger" @click="toggle">
      <span class="box">
        <span class="inner"></span>
      </span>
    </button>
    <div class="menu"></div>
  </nav>
</template>

<script>
  export default {
    name: 'navigation',
    methods: {
      toggle() {
        document.querySelector('.hamburger').classList.toggle('hamburger--active');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../scss/vars/_colors.scss';
  @mixin line() {
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background-color: $richBlack;
    position: absolute;
  }

  nav {
    position: absolute;
    top: 10px;
    right: 12px;
  }

  .hamburger {
    padding: 10px;
    display: inline-block;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    margin: 0;
    transition: transform 0.3s 0.1s ease-in-out;
  }
  .hamburger:focus {
    outline: $richBlack 1.5px solid;
  }

  .box {
    width: 35px;
    height: 24px;
    display: inline-block;
    position: relative;
  }

  .inner {
    @include line;

    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.2s 0.2s ease-in-out;
  }

  .inner::before,
  .inner::after {
    @include line;

    content: '';
    left: 0;
    transition: transform 0.2s 0.2s;
  }

  .inner::before {
    top: -11px;
  }

  .inner::after {
    top: 11px;
  }

  //////////////////////////////////////
  .hamburger--active {
    transform: translateX(-140px);
  }

  .hamburger--active .inner {
    transform: rotate(45deg);
  }

  .hamburger--active .inner::before {
    transform: translateY(11px);
  }

  .hamburger--active .inner::after {
    transform: translateY(-11px) rotate(-90deg);
  }
  .menu {
    width: 140px;
    min-height: 100vh;
    background-color: $richBlack;
    position: absolute;
    top: -10px;
    right: -12px;
    transform: translateX(100%);
    transition: transform 0.2s 0.2s;
  }
  .hamburger--active ~ .menu {
    transform: translateX(0);
  }
</style>
