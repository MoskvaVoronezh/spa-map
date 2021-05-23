import Vue from "vue";
import Vuex from "vuex";
import MapObjects from '@/store/modules/cards.store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    MapObjects,
  },
  mutations: {},
  actions: {},
  modules: {},
});
