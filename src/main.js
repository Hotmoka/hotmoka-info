import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import PortalVue from 'portal-vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(PortalVue)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: '/testnet/',
  routes: [
    { path: '/', component: App },
    { path: '*', redirect: '/' }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
