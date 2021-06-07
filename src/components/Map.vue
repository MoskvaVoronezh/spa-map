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

        //marks logic
        this.marks.forEach(mark => {
          let markOnMap = new ymaps.GeoObject({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [mark.lat, mark.long]
            },
            properties: {
              id: mark.id,
              type: 'mark',
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
          let thisObject = e.get('target');
          if (thisObject.properties._data.type === 'mark') {
            this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: 'marks'});
          }
          else {
            this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: 'circles'});
          }
          if (thisObject.properties._data.balloonContentHeader === "" && thisObject.properties._data.balloonContentBody === "<p></p>") {
            this.map.balloon.events.close();
          }
          this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: thisObject.properties._data.id});
        });

        this.map.geoObjects.events.add('dragend', (e) => {
          let thisObject = e.get('target');
          let coords = thisObject.geometry._coordinates;
          this.$store.commit('cards/saveCoords', {id: thisObject.properties._data.id, coords});
        });

        bus.$on('openMark', (mark) => {
          this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: 'marks'});
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

        //circles logic
        this.circles.forEach(circle => {
          let circleOnMap = new ymaps.GeoObject({
            type: 'Feature',
            geometry: {
              type: 'Circle',
              coordinates: [circle.lat, circle.long],
              radius: circle.radius
            },
            properties: {
              id: circle.id,
              type: 'circle',
            },
          }, {
            draggable: true,
          });

          this.circlesData.push({id: circle.id, circle: circleOnMap});

          this.map.geoObjects.add(circleOnMap);
        });

        bus.$on('clearCircle', (id) => {
          let removeCircle = (this.circlesData as any).find(item => item.id === id);
          this.map.geoObjects.remove(removeCircle.circle)
        });

        bus.$on('saveCircle', (payload) => {
          let currentCircle = this.circlesData.find(item => item.id === payload.id);
          if (currentCircle) {
            this.map.geoObjects.remove(currentCircle.circle);
            this.circlesData = this.circlesData.filter(item => item.id !== payload.id);
          }
          if (payload.lat && payload.long) {
            let circleOnMap = new ymaps.GeoObject({
              type: 'Feature',
              geometry: {
                type: 'Circle',
                coordinates: [payload.lat, payload.long],
                radius: payload.radius
              },
              properties: {
                id: payload.id,
                type: 'circle',
              },
            }, {
              draggable: true,
              fillColor: '#000',
            });

            this.map.balloon.close();

            this.circlesData.push({
              id: payload.id,
              circle: circleOnMap
            });

            this.map.geoObjects.add(circleOnMap);
          }
        });

        bus.$on('openCircle', (payload) => {

        })

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