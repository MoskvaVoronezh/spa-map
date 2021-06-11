import { Vue } from 'vue-property-decorator';
import { MapObjects } from '@/interfaces/map-objects.interface';
import IState = MapObjects.IState;
import {sidebarResource} from '@/resources/sidebar-resource';
import IMark = MapObjects.IMark;
import ICircle = MapObjects.ICircle;

export default {
   namespaced: true,
   state: {
      activeTab: 'marks',
      activeElem: '',
      marks: [],
      circles: []
   },
   mutations: {
      setPropertyInState(state: IState, { name, value }: { name: string, value: any }) {
         Vue.set(state, name, value);
      },

      addCardMark(state: IState, mark: IMark) {
         return state.marks.push(mark);
      },

      addCardCircle(state: IState, circle: ICircle) {
         return state.circles.push(circle);
      },

      saveMark(state: IState, payload) {
        return state.marks.map(mark => {
           if (mark.id === payload.id) {
              mark.name = payload.name;
              mark.description = payload.description;
              mark.lat = payload.lat;
              mark.long = payload.long;
              mark.id = payload.id;
              mark.state = payload.name && payload.description ? 'close' : 'error';
              mark.isOpened = false;
           }
        });
      },

      saveCircle(state: IState, payload) {
        return state.circles.map(circle => {
           if (circle.id === payload.id) {
              circle.name = payload.name;
              circle.address = payload.address;
              circle.radius = payload.radius;
              circle.lat = payload.lat;
              circle.long = payload.long;
              circle.id = payload.id;
              circle.state = payload.name && payload.address && payload.radius ? 'close' : 'error';
              circle.isOpened = false;
           }
           return circle;
        });
      },

      clearMarkCard(state: IState, id) {
         return state.marks.map(mark => {
            if (mark.id === id) {
               mark.name = "";
               mark.description = "";
               mark.lat = "";
               mark.long = "";
               mark.state = "closed";
            }
         });
      },

      clearCircleCard(state, id) {
         return state.circles.map(circle => {
            if (circle.id === id) {
               circle.name = "";
               circle.address = "";
               circle.lat = "";
               circle.long = "";
               circle.radius = null;
               circle.state = 'closed';
            }
         });
      },

      setStateMark(state, payload) {
         return state.marks.map(mark => {
            if (mark.id === payload.id) {
               mark.state = 'error';
            }
         })
      },

      setStateCircle(state, payload) {
         return state.circles.map(circle => {
            if (circle.id === payload.id) {
               circle.state = payload.state;
            }
         })
      },

      saveCoords(state, payload) {
         return state.circles.map(circle => {
            if (circle.id === payload.id) {
               circle.lat = payload.coords[0];
               circle.long = payload.coords[1];
               circle.address = payload.address;
            }
            return circle;
         });
      }
   },
   actions: {
      async getLists({ commit }:any) {
         try {
            const response = await sidebarResource.getLists();

            commit('setPropertyInState', { name: 'marks', value: response.marks });
            commit('setPropertyInState', { name: 'circles', value: response.circles });

            return response;
         }
         catch(e) {
            console.error(e);
         }
      },

      async addCardMark({ commit }) {
         try {
            const response = await sidebarResource.addCardMark();
            commit('addCardMark', response);
         }
         catch (e) {
            console.log(e);
         }
      },

      async addCardCircle({ commit }) {
         try {
            const response = await sidebarResource.addCardCircle();
            commit('addCardCircle', response);
         }
         catch (e) {
            console.log(e);
         }
      },

      async clearMark({commit}, payload) {
         try {
            const response = await sidebarResource.clearMark(payload.id);
            commit('clearMarkCard', payload.id);
         }
         catch (e) {
            console.log(e);
         }
      },

      async clearCircle({commit}, payload) {
         try {
            const response = await sidebarResource.clearCircle(payload.id);
            console.log(payload.id);
            commit('clearCircleCard', payload.id);
         }
         catch (e) {
            console.log(e);
         }
      },

      async saveMark({commit}, payload) {
         try {
            const response = await sidebarResource.saveMark(payload);
            commit('saveMark', payload);
         }
         catch (e) {
            console.log(e);
         }
      },

      async saveCircle({commit}, payload) {
         try {
            const response = await sidebarResource.saveCircle(payload);
            commit('saveCircle', payload);
         }
         catch (e) {
            console.log(e);
         }
      }
   },
};
