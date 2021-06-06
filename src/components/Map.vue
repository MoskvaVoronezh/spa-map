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
    circlesData: any[] = [];
    marksData: any[] = [];

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

        this.marks.forEach(mark => {
          let markOnMap = new ymaps.GeoObject({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [mark.lat, mark.long]
            },
            properties: {
              id: mark.id,
              draggable: false,
              balloonContentHeader: mark.name,
              hintContent: mark.name,
              balloonContentBody: `<p>${mark.description}</p>`
            }
          });

          this.marksData.push({id: mark.id, mark: markOnMap});

          markOnMap.events.add('click', (e) => {
            let thisPlacemark = e.get('target');
            this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: thisPlacemark.properties._data.id});
          });

          this.map.geoObjects.add(markOnMap);
        });

        bus.$on('openMark', (mark) => {
          this.marksData.forEach(item => {
            if (item.id === mark.id) {
              item.mark.balloon.open();
              this.map.setCenter([mark.lat, mark.long], 10);
            }
          });
        });

        bus.$on('clearMark', (id) => {
          let removeMark =(this.marksData as any).find(item => item.id === id);
          this.map.geoObjects.remove(removeMark.mark);
        });
			});
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