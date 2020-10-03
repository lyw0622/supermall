<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scrollPosition">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
    <detail-bot-bar @addToCart="addToCart"></detail-bot-bar>
  </div>
</template>

<script>
    import DetailNavBar from "./child/DetailNavBar"
    import DetailSwiper from "./child/DetailSwiper"
    import DetailBaseInfo from "./child/DetailBaseInfo"
    import DetailShopInfo from "./child/DetailShopInfo"
    import DetailInfo from "./child/DetailInfo"
    import DetailParamInfo from "./child/DetailParamInfo"
    import DetailCommentInfo from "./child/DetailCommentInfo"
    import DetailRecommendInfo from "./child/DetailRecommendInfo"
    import DetailBotBar from "./child/DetailBotBar"
    import BackTop from "content/back_top/BackTop"

    import Scroll from "common/scroll/Scroll";

    import {getGoodsDetail, getRecommend, GoodsInfo, ShopInfo, GoodsParams} from 'network/detail'
    import {itemListenerMinxin} from "@/common/mixin.js"
    import {deBounce} from "@/common/deBounce.js"

    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailRecommendInfo,
            DetailBotBar,
            BackTop,
            Scroll
        },
        data() {
            return {
                id: null,
                topImages: [],
                goodsInfo: {},
                shopInfo: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommendList: [],
                themeYs: [],
                getThemeYs: null,
                currentIndex: 0,
                isShow: false
            }
        },
        mixins: [itemListenerMinxin],
        created() {
            this.id = this.$route.params.id;
            getGoodsDetail(this.id).then(res => {
                this.topImages = res.data.result.itemInfo.topImages;
                this.goodsInfo = new GoodsInfo(res.data.result.itemInfo, res.data.result.columns, res.data.result.shopInfo.services);
                this.shopInfo = new ShopInfo(res.data.result.shopInfo);
                this.detailInfo = res.data.result.detailInfo;
                this.paramInfo = new GoodsParams(res.data.result.itemParams.info, res.data.result.itemParams.rule);
                if (res.data.result.rate.list) {
                    this.commentInfo = res.data.result.rate.list[0];
                }
            })
            getRecommend().then(res => {
                this.recommendList = res.data.data.list;
            })
            this.getThemeYs = deBounce(() => {
                this.themeYs.push(0);
                this.themeYs.push(this.$refs.param.$el.offsetTop);
                this.themeYs.push(this.$refs.comment.$el.offsetTop);
                this.themeYs.push(this.$refs.recommend.$el.offsetTop);
                this.themeYs.push(Infinity);
            }, 100);
        },
        methods: {
            imgLoad() {
                this.deBounce();
                this.getThemeYs();
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeYs[index]);
            },
            scrollPosition(position) {
                for (let i = 0; i < this.themeYs.length - 1; ++i) {
                    if (this.currentIndex != i && Math.abs(position.y) >= this.themeYs[i] && Math.abs(position.y) < this.themeYs[i + 1]) {
                        this.currentIndex = i;
                        this.$refs.detailNavBar.currentIndex = i;
                        break;
                    }
                }
                this.isShow = Math.abs(position.y) > 1000;
            },
            backTop() {
                this.$refs.scroll.scrollTo(0, 0);
            },
            addToCart() {
                const cart = {};
                cart.id = this.id;
                cart.image = this.topImages[0];
                cart.title = this.goodsInfo.title;
                cart.desc = this.goodsInfo.desc;
                cart.price = this.goodsInfo.nowPrice;
                cart.count = 0;
                this.$store.dispatch("addToCart", cart).then(res => {
                    this.$toast.show(res);
                })
            }
        },
        mounted() {
            this.$bus.$on("goodsImgLoadEvent", this.deBounce);
        },
        beforeDestroy() {
            this.$bus.$off("goodsImgLoadEvent", this.deBounce);
        }
    }
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
</style>
