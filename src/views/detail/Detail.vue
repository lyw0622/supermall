<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
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
    import DetailRecommendInfo from "./child/DetailRecommendInfo";

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
                themeYs: [0],
                dbcTheme: null
            }
        },
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
                    // this.themeYs = [];
                    // this.themeYs.push(0);
                    // this.themeYs.push(this.$refs.param.$el.offsetTop);
                    // this.themeYs.push(this.$refs.comment.$el.offsetTop);
                    // this.themeYs.push(this.$refs.recommend.$el.offsetTop);
                    // console.log(this.themeYs);
            })
            getRecommend().then((res, error) => {
                if (error) return
                this.recommendList = res.data.data.list;
            })
        },
        methods: {
            imgLoad() {
                this.$refs.scroll.refresh();
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeYs[index]);
            }
        },
        mixins: [itemListenerMinxin],
        mounted() {
            this.$bus.$on("goodsImgLoadEvent", this.dbc);
            this.dbcTheme = deBounce(() => {
                this.themeYs = [0];
                this.themeYs.push(this.$refs.param.$el.offsetTop);
                this.themeYs.push(this.$refs.comment.$el.offsetTop);
                this.themeYs.push(this.$refs.recommend.$el.offsetTop);
                console.log(this.themeYs);
                // this.themePosY.push(Infinity);
            }, 100);
        },
        beforeDestroy() {
            this.$bus.$off("goodsImgLoadEvent", this.dbc);
        }
    }
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
</style>
