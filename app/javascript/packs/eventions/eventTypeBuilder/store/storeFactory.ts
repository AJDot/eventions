import Vuex from "vuex/dist/vuex";
import eventTypeStoreFactory from "./modules/eventTypeStoreFactory";

export default function(eventType, user) {
  return new Vuex.Store({
    modules: {
      eventTypeStore: eventTypeStoreFactory(eventType, user)
    }
  });
}