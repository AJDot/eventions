import EventType from "../../models/eventType";
import EventTypeProvider from "../../providers/eventTypeProvider";

export default function (eventType, user) {
  return {
    namespaced: true,
    state: {
      eventType: <EventType>eventType,
      user: user,
      eventTypeProvider: <EventTypeProvider>new EventTypeProvider()
    },
    getters: {
    },
    mutations: {
    },
    actions: {
      update({commit, state}, {eventType}) {
        return new Promise((resolve, reject) => {
          state.eventTypeProvider.update({event_type: eventType.asJson()}).then(
              response => {

              }
          );
        });
      }
    }
  }
}