<template>
	<div id="map"></div>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from "vue-property-decorator";
	declare var ymaps: any;
	@Component({})
	export default class Map extends Vue {
		map: any;

		mounted() {
			this.initMap();
		}

		initMap() {
			ymaps.ready(() => {
				this.map = new ymaps.Map("map", {
					center: [55.76, 37.64],
					zoom: 10
				});
			})

		}

		destroyed() {
			this.map.destroyed();
		}
	}
</script>

<style lang="scss">
	#map {
		width: 100%;
		height: 100%;

		.ymaps-2-1-78-map {
			width: 100%;
		}
	}
</style>