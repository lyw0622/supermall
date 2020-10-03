import {ADD_COUNT, ADD_TO_CART} from './mutations_type'

export default {
  addToCart(context, payload) {
    return new Promise((resolve, reject) => {
      let cart = context.state.cartList.find(item => item.id == payload.id);
      if (cart) {
        payload.isChecked = false;
        context.commit(ADD_COUNT, cart);
        resolve("当前商品数量+1");
      } else {
        payload.count += 1;
        payload.isChecked = true;
        context.commit(ADD_TO_CART, payload);
        resolve("添加新商品");
      }
    })
  }
}
