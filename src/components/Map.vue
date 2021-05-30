<template>
	<div id="map"></div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
  import {MapObjects} from "@/interfaces/map-objects.interface";
  import IMark = MapObjects.IMark;
  import ICircle = MapObjects.ICircle;
  import {bus} from "@/plugins/bus";
	declare var ymaps: any;

	@Component({})
	export default class Map extends Vue {
		map: any;
		placemarks: any = [];

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

        ymaps.geolocation.get({provider: 'browser'}).then(result => {
          this.map.setCenter(result.geoObjects.position, 10);
        });

        var objectManager = new ymaps.ObjectManager({ clusterize: false });
        let marksBalloon = [];
        this.marks.forEach(mark => {
          marksBalloon.push({
            type: 'Feature',
            id: mark.id,
            geometry: {
              type: 'Point',
              coordinates: [mark.lat, mark.long]
            },
            properties: {
              balloonContentHeader: mark.name,
              hintContent: mark.name,
              balloonContentBody: `<p>${mark.description}</p>`
            }
          });
        });

        objectManager.add(marksBalloon);
        this.map.geoObjects.add(objectManager);

        bus.$on('openMark', (e) => {
          objectManager.objects.balloon.open(e.id);
          this.map.setCenter([e.lat, e.long], 10);
        });

        objectManager.objects.events.add('click', (e) => {
          this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: 'marks' });
          this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: e._sourceEvent.originalEvent.objectId });
        })
			})
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