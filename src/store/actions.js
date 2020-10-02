import {ADD_COUNT, ADD_TO_CART} from './mutations_type'

export default {
  addToCart(context, payload) {
    let cart = context.state.cartList.find(item => item.id == payload.id);
    if (cart) {
      payload.isChecked = false;
      context.commit(ADD_COUNT, cart);
    } else {
      payload.count += 1;
      payload.isChecked = true;
      context.commit(ADD_TO_CART, payload);
    }
  }
}
