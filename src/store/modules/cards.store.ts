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

      async clearMark({commit}) {
         // try {
         //    const response = await sidebarResource.clearMark(mark);
         //    console.log(response);
         // }
         // catch (e) {
         //    console.log(e);
         // }
      }
   },
};
