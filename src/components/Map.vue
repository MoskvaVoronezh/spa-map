<template>
  <div id="map">
      map
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component({})
  export default class Map extends Vue {
     created() {
        console.log('created')
     }
     mounted() {
        console.log('mounted');
        
     }
  }
</script>

<style lang="scss">
  #map {
     width: 100%;
     height: 100%;
  }
</style>
