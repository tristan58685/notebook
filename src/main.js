import Vue from 'vue'
import App from './App.vue'
import "swiper/css/swiper.css";
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
Vue.prototype.$axios = axios

// 富文本编辑器全局注册
// import { WeToolbar, WeEditable, WeEditor } from 'wangeditor5-for-vue2'
// import '@wangeditor/editor/dist/css/style.css'

/* Vue.use(WeToolbar)
Vue.use(WeEditable)
Vue.use(WeEditor) */
Vue.use(ElementUI);
/* import vueSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css' */

Vue.config.productionTip = false

new Vue({
  // 注册路由对象
  router,
  render: h => h(App),
  //将app放入组件中
}).$mount('#app')
