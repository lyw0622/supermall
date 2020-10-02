<template>
  <div class="bottom-bar">
    <div class="bottom_left">
      <div class="service">
        <i class="icon"></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i class="icon"></i>
        <span>店铺</span>
      </div>
      <div class="collect">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom_right">
      <div class="cart" @click="addToCart">
        加入购物车
      </div>
      <div class="buy">
        购买
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailBotBar",
        methods: {
            addToCart() {
                this.$emit("addToCart");
            }
        }
    }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    font-size: 0.65rem;
    display: flex;
    position: fixed;
    background-color: #ffffff;
    bottom: 0px;
    left: 0px;
    right: 0px;
    text-align: center;
  }

  .bottom_left {
    display: flex;
    flex: 0.7;
  }

  .bottom_left > div {
    flex: 1;
    border-right: 0.04rem solid rgba(128, 128, 128, 0.2);
  }

  .bottom_left .icon {
    display: block;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    width: 1rem;
    height: 1rem;
    margin: 7px auto;
  }

  .service .icon {
    background-position: 0 -2.4rem;
  }

  .shop .icon {
    background-position: 0 -4.5rem;
  }

  .bottom_right {
    display: flex;
    flex: 1;
  }

  .bottom_right > div {
    flex: 1;
    line-height: 49px;
    font-size: 12px;
  }

  .cart {
    background-color: #FF9500;
    color: white;
  }

  .buy {
    background-color: var(--color-tint);
    color: white;
  }

</style>
