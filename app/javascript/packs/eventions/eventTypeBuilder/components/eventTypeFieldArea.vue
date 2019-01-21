<template>
  <div>
    <h2>Event Type Field Area</h2>
    <label for="title">Title</label>
    <input v-model="selectedEventType.title" id="title" type="text">
  </div>
</template>

<script lang="ts">
  import SelectedItemMixin from "../mixins/selectedItemMixin";

  export default {
    mixins: [SelectedItemMixin],
    data: function() {
      return {};
    }
  }
</script>
