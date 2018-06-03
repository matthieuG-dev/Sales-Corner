// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from '@/store/Store'
import moment from 'moment'
import VueJWT from 'vuejs-jwt'

Vue.prototype.moment = moment

Vue.config.productionTip = false

Vue.use(VueJWT)
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}) 

