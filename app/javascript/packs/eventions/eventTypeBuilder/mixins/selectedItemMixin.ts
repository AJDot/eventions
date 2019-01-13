import EventType from "../models/eventType";

export default {
  data: function() {
    return {
      eventTypeStore: this.$store.state.eventTypeStore
    }
  },
  computed: {
    selectedEventType: {
      get(): EventType {
        return this.eventTypeStore.eventType;
      }
    }
  }
}