// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BuyDialogComponent from '@/components/Common/BuyDialog'
import * as fb from 'firebase/app'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#4F4A87',
    warning: '#FF9800'
  }
})
Vue.component('app-buy-dialog', BuyDialogComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
     // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyBRB7S9c-DiEyQmVU7H6KWguDaXoVnmhHg',
      authDomain: 'inflationstore-1b560.firebaseapp.com',
      databaseURL: 'https://inflationstore-1b560.firebaseio.com',
      projectId: 'inflationstore-1b560',
      storageBucket: 'inflationstore-1b560.appspot.com',
      messagingSenderId: '676696352981'
    }
    fb.initializeApp(config)
    fb.auth().onAuthStateChanged(user => {
      console.log(' onAuth user')
      console.log(user)
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchProducts')
  }
})
