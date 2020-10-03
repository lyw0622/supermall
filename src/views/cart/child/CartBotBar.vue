<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isChecked="isSelectAll" @click.native="selectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">结算({{totalCount}})</span>
  </div>
</template>

<script>
    import CheckButton from "content/check_button/CheckButton";

    import {mapGetters} from "vuex"

    export default {
        name: "CartBotBar",
        components: {
            CheckButton
        },
        computed: {
            ...mapGetters([
                "cartList"
            ]),
            totalPrice() {
                return this.cartList.filter(item => {
                    return item.isChecked
                }).reduce((preValue, item) => {
                    return preValue + item.count * item.price
                }, 0).toFixed(2)
            },
            totalCount() {
                return this.cartList.filter(item => item.isChecked).length
            },
            isSelectAll() {
                if (this.cartList.length == 0) return false
                return this.cartList.every(item => item.isChecked)
            }
        },
        methods: {
            selectAll() {
                if (this.isSelectAll) {  //由全部选中变为全部不选中
                    this.cartList.forEach(item => item.isChecked = false)
                } else {  //由全部不选中或部分不选中变为全部选中
                    this.cartList.forEach(item => item.isChecked = true)
                }
            }
        }
    }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: var(--color-tint);
    color: #ffffff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
