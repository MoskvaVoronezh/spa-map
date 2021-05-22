<template>
  <div id="map"></div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
	declare var ymaps: any;
  @Component({})
  export default class Map extends Vue {
		
		mounted() {
			this.initMap();
		}
		
		initMap() {
			const map = new ymaps.Map("map", {
				center: [55.76, 37.64],
				zoom: 10
			});
		}
  }
</script>

<style lang="scss">
  #map {
     width: 100%;
     height: 100%;
  }
</style>
