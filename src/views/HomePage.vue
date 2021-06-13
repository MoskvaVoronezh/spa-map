<template>
  <div class="page">
    <Sidebar class="page__sidebar"/>
    <main class="page__map">
      <Map />
    </main>
    <Listing class="page__listing"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import Sidebar from "@/components/menus/Sidebar.vue";
  import Listing from "@/components/menus/Listing.vue";
  import Map from "@/components/Map.vue";
  

  @Component({
    components: {
      Sidebar,
      Listing,
      Map,
    }
  })
  export default class HomePage extends Vue {
  }
</script>

<style lang="scss" scoped>
  .page {
    position: relative;
    display: flex;
    align-items: stretch;
    overflow: hidden;

    &__map {
      flex: 1;
      width: 100%;
    }
  }
</style>
