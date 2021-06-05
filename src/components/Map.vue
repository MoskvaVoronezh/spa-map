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
    circlesData: {}
    marksData: {}

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

        let ObjectManagerCircles = new ymaps.ObjectManager();
        let ObjectManagerMarks = new ymaps.ObjectManager();

        this.marksData = {
          type: "FeatureCollection",
          features: this.marks.map(mark => {
            return {
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
            }
          })
        }

        this.circlesData = {
          type: "FeatureCollection",
          features: this.circles.map(circle => {
            return {
              type: 'Feature',
              id: circle.id,
              geometry: {
                type: "Circle",
                coordinates: [circle.lat, circle.long],
                radius: circle.radius
              },
              properties: {
                hintContent: circle.address,
                balloonContentHeader: circle.name,
                balloonContentBody: `<p>${circle.address}</p>`
              },
              options: {
                draggable: true,
                strokeColor: '#fff',
                strokeWidth: 2,
              }
            }
          })
        }

        ObjectManagerMarks.add(this.marksData);
        ObjectManagerCircles.add(this.circlesData);

        this.map.geoObjects.add(ObjectManagerMarks);
        this.map.geoObjects.add(ObjectManagerCircles);

        bus.$on('openMark', (e) => {
          ObjectManagerMarks.objects.balloon.open(e.id);
          this.map.setCenter([e.lat, e.long], 10);
        });

        bus.$on('deleteMark', (e) => {
          ObjectManagerMarks.remove([e.id]);
        });

        bus.$on('openCircle', (e) => {
          ObjectManagerCircles.objects.balloon.open(e.id);
          this.map.setCenter([e.lat, e.long], 10);
        });

        ObjectManagerMarks.objects.events.add('click', (e) => {
          this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: 'marks' });
          this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: e._sourceEvent.originalEvent.objectId });
        });

        ObjectManagerCircles.objects.events.add('click', (e) => {
          this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: 'circles' });
          this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: e._sourceEvent.originalEvent.objectId });
        });

        ObjectManagerCircles.objects.events.add('drag', (e) => {
          console.log(e);
          // this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: 'circles' });
          // this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: e._sourceEvent.originalEvent.objectId });
        });
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