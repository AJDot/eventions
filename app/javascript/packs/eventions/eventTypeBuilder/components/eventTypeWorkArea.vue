<template>
  <div>
    <event-type-field-area></event-type-field-area>
    <event-field-area></event-field-area>
  </div>
</template>

<script lang="ts">
  import SelectedItemMixin from "../mixins/selectedItemMixin";
  import EventFieldArea from "./eventFieldArea.vue";
  import EventTypeFieldArea from "./eventTypeFieldArea.vue";

  export default {
    components: {EventTypeFieldArea, EventFieldArea},
    mixins: [SelectedItemMixin],
    data: function() {
      return {};
    },
    computed: {
    },
  }
</script>