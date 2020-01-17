import Vue from 'vue';
import App from './App.vue';
import utils from 'dcv-tool';
// import router from './router';
import store from './store/index';
import ViewUI from 'view-design';

// import style
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

Vue.config.productionTip = false;
Vue.prototype.$Message.config({
  top: 50,
  duration: 3
});

const win: any = window;
win.utils = utils;

win.vm = new Vue({
  // router,
  store,
  render: (h) => h(App)
}).$mount('#app');
