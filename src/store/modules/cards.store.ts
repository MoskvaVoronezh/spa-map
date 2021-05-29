import { Vue } from 'vue-property-decorator';
import { MapObjects } from '@/interfaces/map-objects.interface';
import IState = MapObjects.IState;
import {sidebarResource} from '@/resources/sidebar-resource';

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
      addCardMark(state: IState, value) {
         return state.marks.push(value);
      },
      addCardCircle(state: IState, value) {
         return state.circles.push(value);
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
            commit('setPropertyInState', { name: 'activeElem', value: response.id })
            commit('addCardMark', response);
         }
         catch (e) {
            console.log(e);
         }
      },

      async addCardCircle({ commit }) {
         try {
            const response = await sidebarResource.addCardCircle();
            commit('setPropertyInState', { name: 'activeElem', value: response.id })
            commit('addCardCircle', response);
         }
         catch (e) {
            console.log(e);
         }
      }
   },
};
