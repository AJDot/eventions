// import storeFactory from "./store/storeFactory"

import Vue from 'vue/dist/vue'
// import Vuex from 'vuex/dist/vuex'
import App from './appVue.vue'
// import AppConfig from "../app_config";

// declare global {
//   interface Window {
//     AppConfig: AppConfig;
//     environment: string;
//   }
// }

// Vue.use(Vuex);

var onReady = function () {
//   // window.AppConfig = new AppConfig();
//
  console.log('stuff')
  let $rootElement = $(document).find('#vue-data');
  var eventType = $rootElement.data('event-type');
  var user = $rootElement.data('user');
//
//   // var store = storeFactory(form, user, groups, organization);
  const app = new Vue({
    el: "#vue-data",
    render: h => h(App),
//     // store: store,
//     created(): void {
//     },
//     beforeDestroy(): void {
//     },
//     methods: {
//     }
  });
};

$(onReady);
