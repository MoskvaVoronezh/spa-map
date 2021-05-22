<template>
  <aside class="sidebar">
      sidebar
  </aside>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component({})
  export default class Sidebar extends Vue {

  }
</script>

<style lang="scss">
  .sidebar {
     height: 100vh;
     min-height: -webkit-fill-available;
     border: 1px solid #000;
     width: 25vw;
  }
</style>
