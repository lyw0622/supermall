<template>
  <div class="tar-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active: isActive}" class="text">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props: {
          path: String
        },
        computed: {
            isActive() {
                return this.$route.path.indexOf(this.path) != -1;
            }
        },
        methods: {
            itemClick() {
                this.$router.push(this.path);
            }
        }
    }
</script>

<style scoped>
  .tar-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .tar-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
  }

  .active {
    color: #FF5777;
  }
</style>
