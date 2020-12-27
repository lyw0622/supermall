import { deBounce } from "@/common/deBounce"
import BackTop from "content/back_top/BackTop"

export const itemListenerMinxin = {
  data() {
    return {
      goodsImgListener: null,
      deBounceRefresh: null
    }
  },
  mounted() {
    this.deBounceRefresh = deBounce(this.$refs.scroll.refresh, 50)
    this.goodsImgListener = () => {
      this.deBounceRefresh();
    }
    this.$bus.$on('goodsImgLoadEvent', this.goodsImgListener);
  }
}

export const backTopMinxin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
};
