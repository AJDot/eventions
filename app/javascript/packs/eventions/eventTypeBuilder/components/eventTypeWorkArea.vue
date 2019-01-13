<template>
  <div>
    <label for="name">Name</label>
    <input v-model="selectedEventType.name" id="name" type="text">
  </div>
</template>

<script lang="ts">
  import SelectedItemMixin from "../mixins/selectedItemMixin";

  export default {
    mixins: [SelectedItemMixin],
    data: function() {
      return {};
    },
    computed: {
    },
  }
</script>