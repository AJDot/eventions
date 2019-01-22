<template>
  <div>
    <event-field-area-header></event-field-area-header>
    <button @click="create(EventFieldType.text)">Text Field</button>
    <button @click="create(EventFieldType.number)">Number Field</button>

    <div v-for="eventField in selectedEventType.event_fields">
      <h3>{{eventField.fieldTypeDisplayName}}</h3>
      <label :for="`event_field_${eventField.id}`">Label</label>
      <input v-model="eventField.label" type="text" :id="`event_field_${eventField.id}`">
    </div>
  </div>
</template>

<script lang="ts">
  import EventFieldAreaHeader from "./eventFieldAreaHeader.vue";
  import {EventFieldType} from "../enums/eventFieldType";
  import SelectedItemMixin from "../mixins/selectedItemMixin";
  import EventFieldFactory from "../models/eventFields/eventFieldFactory";

  export default {
    components: {EventFieldAreaHeader},
    mixins: [SelectedItemMixin],
    data: function() {
      return {
        EventFieldType: EventFieldType
      };
    },
    methods: {
      create(eventFieldType: EventFieldType) {
        let eventField = EventFieldFactory.create(this.selectedEventType, eventFieldType);
        this.selectedEventType.event_fields.push(eventField);
      }
    }
  }
</script>