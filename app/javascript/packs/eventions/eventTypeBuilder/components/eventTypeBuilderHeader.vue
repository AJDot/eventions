<template>
  <nav class="navbar-expand-lg">
    <div class="container-fluid">
      <h3>{{selectedEventType.displayTitle}}</h3>
      <button @click="update" class="btn">Save</button>
    </div>
  </nav>
</template>

<script lang="ts">
  import SelectedItemMixin from "../mixins/selectedItemMixin";

  export default {

    mixins: [SelectedItemMixin],
    data: function() {
      return {};
    },
    methods: {
      update() {
        this.$store.dispatch('eventTypeStore/update', {eventType: this.selectedEventType});
      }
    }
  }
</script>