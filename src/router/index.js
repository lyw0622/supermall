import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      isShow: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      isShow: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      isShow: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShow: true
    }
  },
  {
    path: '/detail/:id',
    component: Detail,
    meta: {
      isShow: false
    }
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
