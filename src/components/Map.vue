<template>
	<div id="map"></div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
  import {MapObjects} from "@/interfaces/map-objects.interface";
  import IMark = MapObjects.IMark;
  import ICircle = MapObjects.ICircle;
	declare var ymaps: any;

	@Component({})
	export default class Map extends Vue {
		map: any;

    get marks(): IMark[] {
      return this.$store.state.cards.marks;
    }

    get circles(): ICircle[] {
      return this.$store.state.cards.circles;
    }

		mounted() {
			this.initMap();
		}

		initMap() {
			ymaps.ready(() => {
				this.map = new ymaps.Map("map", {
					center: [55.76, 37.64],
					zoom: 10
				});

				this.marks.forEach(mark => {
				  if(mark.lat && mark.long) {
            let objectOnMap = new ymaps.Placemark([mark.lat, mark.long], {
              // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
              balloonContentHeader: mark.name,
              balloonContentBody: `<p>${mark.description}</p>`,
              hintContent: "Хинт метки"
            });

            this.map.geoObjects.add(objectOnMap);
          }
        })

				ymaps.geolocation.get({provider: 'browser'}).then(result => {
					this.map.setCenter(result.geoObjects.position, 10);
				});
			})

		}

		destroyed() {
			this.map.destroyed();
		}
	}
</script>

<style lang="scss" scoped>
	#map {
		width: 100%;
		height: 100%;

		.ymaps-2-1-78-map {
			width: 100%;
		}
	}
</style>