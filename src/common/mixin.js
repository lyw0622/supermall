/**
 * 防抖minxin封装
 */
import { deBounce } from "@/common/deBounce";
export const itemListenerMinxin = {
  data() {
    return {
      dbc: null
    };
  },
  mounted() {
    // 防抖
    let deBounceRefresh = deBounce(this.$refs.scroll.refresh, 50);
    this.dbc = () => {
      //利用 $bus 事件监听，去刷新 scroll的高度
      deBounceRefresh();
    };
  }
};

/**
 * 回到顶部minxin封装
 */
// import BackTop from "content/backTop/BackTop.vue";
// export const backTopMinxin = {
//   components: {
//     BackTop
//   },
//   data() {
//     return {
//       isShowTop: false
//     };
//   },
//   methods: {
//     backClick() {
//       this.$refs.scroll.scrollTo(0, 0);
//     }
//   }
// };
