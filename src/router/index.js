import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AuthGuard from '@/router/auth-guard.js'
import Product from '@/components/Products/Product'
import NewProduct from '@/components/Products/NewProduct'
import ProductsList from '@/components/Products/ProductsList'
import Checkout from '@/components/User/Checkout'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home

    },
    {
      name: 'product',
      path: '/product/:id',
      props: true,
      component: Product
    },
    {
      name: 'new',
      path: '/new',
      component: NewProduct,
      beforeEnter: AuthGuard

    },
    {
      name: 'list',
      path: '/list',
      component: ProductsList,
      beforeEnter: AuthGuard

    },
    {
      name: 'checkout',
      path: '/checkout',
      component: Checkout,
      beforeEnter: AuthGuard

    },
    {
      name: 'login',
      path: '/login',
      component: Login

    },
    {
      name: 'register',
      path: '/register',
      component: Register

    }
  ],
  mode: 'history'
})
