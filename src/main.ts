import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import '@/styles/main.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/plugins/bus';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
