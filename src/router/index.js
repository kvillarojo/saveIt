import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/HelloWorld'
import Budget from '@/components/pages/budget/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/budget',
      name: 'Bubget',
      component: Budget
    }
  ]
})
