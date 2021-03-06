<template>
  <div class="home">
    <nav-bar class="home_nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <tab-control class="tab-control" ref="newTabControl" :titles="['流行', '新款', '精选']" @tabClick="tabClick"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pullUpLoad="true" @scroll="scrollPosition"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control ref="tabControl" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
    import HomeSwiper from "./child/HomeSwiper"
    import HomeRecommend from "./child/HomeRecommend"
    import HomeFeature from "./child/HomeFeature"

    import NavBar from "common/navbar/NavBar"
    import TabControl from "content/tab_control/TabControl"
    import GoodsList from "content/goods/GoodsList"
    import Scroll from "common/scroll/Scroll"

    import {getHomeMultiData, getHomeGoods} from "network/home"
    import {itemListenerMinxin, backTopMinxin} from "@/common/mixin"

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            HomeRecommend,
            HomeFeature,
            TabControl,
            GoodsList,
            Scroll
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    "pop": {page: 0, list: []},
                    "new": {page: 0, list: []},
                    "sell": {page: 0, list: []}
                },
                currentType: "pop",
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0
            }
        },
        created() {
            this.getHomeMultiData();
            this.getHomeGoods("pop");
            this.getHomeGoods("new");
            this.getHomeGoods("sell");
        },
        methods: {
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
                this.$refs.newTabControl.currentIndex = index;
                this.$refs.tabControl.currentIndex = index;
            },
            getHomeMultiData() {
                getHomeMultiData().then(res => {
                    this.banners = res.data.data.banner.list;
                    this.recommends = res.data.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.data.list);
                    this.goods[type].page += 1;
                })
            },
            swiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
            },
            scrollPosition(position) {
                this.isShow = Math.abs(position.y) > 1000;
                this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
            },
            loadMore() {
                this.getHomeGoods(this.currentType);
                setTimeout(() => {
                    this.$refs.scroll.finishPullUp();
                }, 2000)
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        mixins: [itemListenerMinxin, backTopMinxin],
        activated(position) {
            this.$refs.scroll.scrollTo(0, this.saveY, 0);
            this.$refs.scroll.refresh();
        },
        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY();
            this.$bus.$off('goodsImgLoadEvent', this.goodsImgListener);
        }
    }
</script>

<style scoped>
  .home {
    height: 100vh;
    position: relative;
  }

  .home_nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .tab-control {
    position: relative;
    z-index: 1;
    bottom: 1px;
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

