import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Mine from '@/views/Mine'
import Line from '@/views/LineView'
import Carpool from '@/views/nav/Carpool'
import Chartcar from '@/views/nav/Chartcar'
import Freecar from '@/views/nav/Freecar'
import Traincar from '@/views/nav/Traincar'
import Goods from '@/views/nav/Goods'
import Things from '@/views/nav/Things'
import Create from '@/views/components/Create'
import TrainCheck from '@/views/components/trainCheck'
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
          path: '/traincar',
          component: Traincar,
          name: '班线车'
        },
        {
          path: '/freecar',
          component: Freecar,
          name: '顺风车'
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

    },
    {
      path: '/create',
      component: Create,
      hidden: true
    },
    {
      path: '/trainCheck',
      component: TrainCheck,
      hidden: true
    },
    {
      path: '/mine',
      component: Mine,
      hidden: true
    },
    {
      path: '/lines',
      component: Line,
      hidden: true
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
