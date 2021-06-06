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

          this.map.geoObjects.add(markOnMap);
        });

        this.map.geoObjects.events.add('click', (e) => {
          let thisPlacemark = e.get('target');
          if (thisPlacemark.properties._data.balloonContentHeader === "" && thisPlacemark.properties._data.balloonContentBody === "<p></p>") {
            this.map.balloon.events.close();
          }
          this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: thisPlacemark.properties._data.id});
        });

        bus.$on('openMark', (mark) => {
          this.marksData.forEach(item => {
            if (item.id === mark.id) {
              if (mark.name && mark.description) {
                item.mark.balloon.open();
              }
              this.map.setCenter([mark.lat, mark.long], 10);
            }
          });
        });

        bus.$on('clearMark', (id) => {
          let removeMark = (this.marksData as any).find(item => item.id === id);
          this.map.geoObjects.remove(removeMark.mark);
          this.marksData = this.marksData.filter(item => item.id !== id);
        });

        bus.$on('saveMark', (payload) => {
          let currentMark = this.marksData.find(item => item.id === payload.id);
          if (currentMark) {
            this.map.geoObjects.remove(currentMark.mark);
            this.marksData = this.marksData.filter(item => item.id !== payload.id);
          }
          if (payload.lat && payload.long) {
            let markOnMap = new ymaps.GeoObject({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [payload.lat, payload.long]
              },
              properties: {
                id: payload.id,
                draggable: false,
                balloonContentHeader: payload.name,
                hintContent: payload.name,
                balloonContentBody: `<p>${payload.description}</p>`
              }
            });

            this.map.balloon.close();

            this.marksData.push({
              id: payload.id,
              mark: markOnMap
            });

            this.map.geoObjects.add(markOnMap);
          }
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