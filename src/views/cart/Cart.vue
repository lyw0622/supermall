<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车<p class="length" v-show="cartListLength != 0">({{cartListLength}})</p></div>
    </nav-bar>
    <div class="null-cart" v-show="cartListLength == 0">
      <img src="~assets/img/cart/shopping_cart.svg">
      <p>您的购物车为空</p>
    </div>
    <scroll class="content" ref="scroll">
        <cart-list></cart-list>
    </scroll>
    <cart-bot-bar v-show="cartListLength != 0"></cart-bot-bar>
  </div>
</template>

<script>
    import NavBar from "common/navbar/NavBar"
    import CartList from "./child/CartList"
    import CartBotBar from "./child/CartBotBar";

    import Scroll from "common/scroll/Scroll"

    import {mapGetters} from "vuex"

    export default {
        name: "Cart",
        components: {
            NavBar,
            CartList,
            CartBotBar,
            Scroll
        },
        computed: {
            ...mapGetters([
                "cartListLength"
            ])
        },
        activated() {
            this.$refs.scroll.scroll.refresh();
        }
    }
</script>

<style scoped>
  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .length {
    display: inline;
  }

  .null-cart {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .null-cart img {
    padding-left: 5px;
  }

  .null-cart p {
    padding: 10px;
    text-align: center;
    font-size: 20px;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
</style>
