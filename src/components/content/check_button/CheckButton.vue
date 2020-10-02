<template>
    <div class="check-button" :class="{check: isChecked}">
      <img src="~assets/img/cart/tick.svg">
    </div>
<!--  <div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">-->
</template>

<script>
    export default {
        name: "CheckButton",
        props: {
            isChecked: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
  .check-button {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #cccccc;
    cursor: pointer;
  }

  .check {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
