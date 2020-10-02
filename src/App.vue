<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-show="$route.meta.isShow"></main-tab-bar>
  </div>
</template>

<script>
    import MainTabBar from "components/content/main_tabbar/MainTabBar";

    export default {
        name: 'App',
        components: {
            MainTabBar
        }
    }
</script>

<style>
  @import "assets/css/base.css";
</style>
