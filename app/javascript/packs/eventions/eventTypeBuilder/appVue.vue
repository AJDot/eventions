<template>
  <div>
    <event-type-builder-header></event-type-builder-header>
    <event-type-work-area></event-type-work-area>
  </div>
</template>

<script lang="ts">
  import EventTypeBuilderHeader from "./components/eventTypeBuilderHeader"
  import EventTypeWorkArea from "./components/eventTypeWorkArea"

  export default {
    components: {
      EventTypeBuilderHeader,
      EventTypeWorkArea
    },
    data: function() {
      return {};
    }
  }
</script>