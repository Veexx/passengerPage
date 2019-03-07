import 'amfe-flexible'
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import store from './vuex/store'
import Vuex from 'vuex'
import AMap from 'vue-amap'
import {
  /* eslint-disable no-unused-vars */
  Style,  
  Button,
  ScrollNavBar,
  Checkbox,
  // Radio,
  Input,
  Textarea,
  Select,
  // Switch,
  // Rate,
  // Validator,
  Loading,
  Tip,
  // Popup,
  Toast,
  Picker,
  // CascadePicker,
  TimePicker,
  DatePicker,
  Dialog,
  ActionSheet,
  Scroll,
  Slide,
  IndexList,
  Swipe
  // Upload
} from 'cube-ui'
// import { DatetimePicker } from 'vant'
import 'vant/lib/vant-css/index.css'
import './style/base.css'
import App from './App'
// Vue.use(DatetimePicker)
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: 'fda04b818533c6a68e833ed4e0941bf7',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder', 'AMap.PositionPicker'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
Vue.use(Checkbox)
Vue.prototype.$http = axios
Vue.use(Button)
Vue.use(ScrollNavBar)
// Vue.use(Radio)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Select)
// Vue.use(Switch)
// Vue.use(Rate)
// Vue.use(Validator)
Vue.use(Loading)
Vue.use(Tip)
Vue.use(Toast)
Vue.use(Picker)
// Vue.use(CascadePicker)
Vue.use(TimePicker)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(IndexList)
Vue.use(Swipe)
// Vue.use(Upload)
Vue.use(Vuex)
Vue.use(DatePicker)
Vue.config.productionTip = false
//全局指令
// const windowHeight = window.innerHeight
Vue.directive('fixedInput', function (el, binding) {
  el.addEventListener('blur', function () {
  
    setTimeout(() => {
         const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
          }, 100);
  //   let windowFocusHeight = window.innerHeight
  //   if (windowHeight == windowFocusHeight) {
  //     return
  //   }
  //   console.log(windowHeight + '--' + windowFocusHeight);
  //   console.log('修复');
  //   let currentPosition;
  //   let speed = 1; //页面滚动距离
  //   currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
  //   currentPosition -= speed;
  //   window.scrollTo(0, currentPosition); //页面向上滚动
  //   currentPosition += speed; //speed变量
  //   window.scrollTo(0, currentPosition); //页面向下滚动
  })
});
Vue.prototype.fixedInput = function(e){
  console.log(2222);
  setTimeout(() => {
         const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
          }, 100);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
