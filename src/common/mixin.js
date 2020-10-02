import { deBounce } from "@/common/deBounce";
export const itemListenerMinxin = {
  data() {
    return {
      deBounce: null
    };
  },
  mounted() {
    // 防抖
    let deBounceRefresh = deBounce(this.$refs.scroll.refresh, 50);
    this.deBounce = () => {
      //利用 $bus 事件监听，去刷新 scroll的高度
      deBounceRefresh();
    };
  }
};
