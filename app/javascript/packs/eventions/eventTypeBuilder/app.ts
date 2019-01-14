import storeFactory from "./store/storeFactory"

import Vue from 'vue/dist/vue'
import Vuex from 'vuex/dist/vuex'
import App from './appVue.vue'
import EventType from "./models/eventType";
import AppConfig from "../../common/appConfig";

declare global {
  interface Window {
    AppConfig: AppConfig;
    environment: string;
  }
}

Vue.use(Vuex);

var onReady = function () {
  window.AppConfig = new AppConfig();
  let $rootElement = $(document).find('#vue-data');
  let eventType = new EventType().loadFromJson($rootElement.data('event-type'));
  let user = $rootElement.data('user');

  let store = storeFactory(eventType, user);
  eventType.setStore(store);
  const app = new Vue({
    el: "#vue-data",
    render: h => h(App),
    store: store,
  });
};

$(onReady);
