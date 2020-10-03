<template>
  <div class="toast">
    <transition name="toast">
      <div class="toast_div" v-show="isShow">{{ message }}</div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "Toast",
        data() {
            return {
                isShow: false,
                message: ""
            };
        },
        methods: {
            show(msg, delay = 1500) {
                this.isShow = true;
                this.message = msg;
                setTimeout(() => {
                    this.isShow = false;
                }, delay);
            }
        }
    }
</script>

<style scoped>
  .toast_div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(128, 128, 128, 0.9);
    border-radius: 0.4rem;
    border: 0.04rem solid rgba(0, 0, 0, 0.4);
    color: #ffffff;
    font-size: 1rem;
    text-align: center;
    line-height: 2rem;
    height: 2rem;
    width: 10rem;
  }

  .toast-enter,
  .toast-leave-to {
    opacity: 0;
  }

  .toast-enter-active {
    transition: opacity 1.5s;
  }

  .toast-leave-active {
    transition: opacity 1.5s;
  }
</style>
