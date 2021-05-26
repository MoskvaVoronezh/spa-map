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
      }
   },
   actions: {
      async getLists({state, commit}:any) {
         try {
            const response = await sidebarResource.getLists();

            commit('cards/setPropertyInState', { name: 'marks', value: response.marks });
            commit('cards/setPropertyInState', { name: 'circles', value: response.circles });

            return response;
         }
         catch(e) {
            console.error(e);
         }
      }
   },
};
