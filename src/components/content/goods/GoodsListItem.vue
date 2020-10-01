<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="getImg" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collection">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            goodsItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            imgLoad() {
                // this.$bus.$emit("goodsImageLoad");
                this.$bus.$emit("goodsImgLoadEvent");
            },
            goodsItemClick() {
                // this.$router.push('/detail/'+this.goodsItem.iid);
                if (this.$route.path.indexOf("home") != -1) {
                    this.$router.push("/detail/" + this.goodsItem.iid);
                }
            }
        },
        computed: {
            getImg() {
                return this.goodsItem.image || this.goodsItem.show.img
            }
        }
    }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collection {
    position: relative;
  }

  .goods-info .collection::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
