import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Carpool from '@/components/nav/Carpool'
import Chartcar from '@/components/nav/Chartcar'
import Freecar from '@/components/nav/Freecar'
import Traincar from '@/components/nav/Traincar'
import Goods from '@/components/nav/Goods'
import Things from '@/components/nav/Things'
import Create from '@/components/public/Create'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'bottom-active',
  routes: [
    {
      path: '/',
      redirect: '/carpool',
      hidden: true
    },
    {
      path: '/create',
      component: Create,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/carpool',
          component: Carpool,
          name: '拼车'
        },
        {
          path: '/chartcar',
          component: Chartcar,
          name: '包车'
        },
        {
          path: '/freecar',
          component: Freecar,
          name: '顺风车'
        },
        {
          path: '/traincar',
          component: Traincar,
          name: '专线车'
        },
        {
          path: '/goods',
          component: Goods,
          name: '带货'
        },
        {
          path: '/things',
          component: Things,
          name: '代办'
        }
      ]

    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
